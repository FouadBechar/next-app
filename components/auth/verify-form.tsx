'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { verifyOtpSchema } from '@/lib/utils/validation';
import { verifyOtp } from '@/lib/utils/auth-helpers';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';

type FormData = z.infer<typeof verifyOtpSchema>;

export function VerifyForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [isPasswordReset, setIsPasswordReset] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: '',
    },
  });

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('verificationEmail');
    if (!storedEmail) {
      router.push('/auth/signup');
      return;
    }

    const passwordResetFlag = sessionStorage.getItem('isPasswordReset');
    setIsPasswordReset(passwordResetFlag === 'true');

    setEmail(storedEmail);
  }, [router]);

  async function onSubmit(data: FormData) {
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      await verifyOtp(email, data.otp);
      sessionStorage.removeItem('verificationEmail');

      if (isPasswordReset) {
        router.push('/auth/new-password');
      } else {
        sessionStorage.removeItem('isPasswordReset');

        await fetch('/api/resend', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'welcome',
            email: email,
            origin: window.location.origin,
          }),
        });

        router.push('/dashboard');
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during verification'
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function resendOtp() {
    if (!email) return;

    setIsLoading(true);
    setError(null);

    try {
      // Resend verification email
      await fetch('/api/resend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'verification',
          email,
          isPasswordReset: isPasswordReset,
        }),
      });

      setError('A new verification code has been sent to your email.');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to resend verification code'
      );
    } finally {
      setIsLoading(false);
    }
  }

  if (!email) {
    return null;
  }

  return (
    <div className="space-y-6">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert
            variant={
              error.includes('has been sent') ? 'default' : 'destructive'
            }
          >
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="text-center mb-4">
        <p>
          We&apos;ve sent a verification code to{' '}
          <span className="font-medium">{email}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          {isPasswordReset
            ? 'Enter the code to continue with your password reset'
            : 'Enter the code to verify your account'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verification Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter 6-digit code"
                    {...field}
                    maxLength={6}
                    className="text-center text-lg tracking-widest"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading
              ? 'Verifying...'
              : isPasswordReset
                ? 'Continue Password Reset'
                : 'Verify Email'}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Didn&apos;t receive the code?{' '}
        <button
          onClick={resendOtp}
          className="text-blue-600 hover:underline"
          disabled={isLoading}
        >
          Resend
        </button>
      </div>
    </div>
  );
}
