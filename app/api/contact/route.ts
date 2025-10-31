import { createAdminClient } from '@/utils/supabase/client';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const prenom = String(form.get('prenom') ?? '');
    const nom = String(form.get('nom') ?? '');
    const email = String(form.get('email') ?? '');
    const message = String(form.get('textarea') ?? '');
    const file = form.get('file') as File | null;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // If a file was attached, upload it to Supabase Storage and obtain a public URL
    let fileUrl: string | null = null;
    let fileNameStored: string | null = null;
    if (file && (file as any).size > 0) {
      try {
        const arrayBuffer = await (file as File).arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const originalName = (file as any).name ?? `upload-${Date.now()}`;
        // make a safe unique path
        const safeName = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${originalName.replace(/[^a-zA-Z0-9._-]/g, '')}`;
        const bucket = process.env.SUPABASE_STORAGE_BUCKET ?? 'contacts';

        const uploadResult = await supabase.storage.from(bucket).upload(safeName, buffer, {
          contentType: (file as any).type || 'application/octet-stream',
          upsert: false,
        });

        if (uploadResult.error) {
          console.error('Supabase upload error', uploadResult.error);
        } else {
          fileNameStored = originalName;
          const publicRes = await supabase.storage.from(bucket).getPublicUrl(safeName);
          fileUrl = (publicRes as any)?.data?.publicUrl ?? null;
        }
      } catch (upErr) {
        console.error('File upload error', upErr);
      }
    }

    // Insert contact record into Supabase `contacts` table.
    const insertPayload: any = {
      first_name: prenom,
      last_name: nom,
      email,
      message,
      file_name: fileNameStored,
      file_url: fileUrl,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase.from('contacts').insert([insertPayload]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Send confirmation email to the sender using Resend
    const safeFirst = escapeHtml(prenom || nom || 'there');
    const safeMessage = escapeHtml(message || '');

    try {
      const html = `
        <div>
          <p>Hi ${safeFirst},</p>
          <p>Thanks for contacting us. We received your message:</p>
          <blockquote>${safeMessage}</blockquote>
          <p>We'll process your request as soon as possible and get back to you at ${escapeHtml(email)}.</p>
          <p>— The team</p>
        </div>
      `;

      await resend.emails.send({
        from: 'fouad@bechar.x10.network',
        to: email,
        subject: 'We received your message',
        html,
      });
    } catch (mailErr) {
      // log but don't fail the whole request; return partial success
      console.error('Resend error', mailErr);
      return NextResponse.json({ status: 'stored', message: 'Saved but failed to send confirmation email' });
    }

    return NextResponse.json({ status: 'success', message: 'Submission complete' });
  } catch (err) {
    console.error('Contact API error', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
