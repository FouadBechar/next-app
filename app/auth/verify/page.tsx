import { AuthForm } from '@/components/auth/auth-form';
import { VerifyForm } from '@/components/auth/verify-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Verification Code',
  description: 'Enter the verification code sent to your email',
};

export default function VerifyPage() {
  return (
    <AuthForm
      title="Verification Required"
      description="Enter the verification code sent to your email"
    >
      <VerifyForm />
    </AuthForm>
  );
}
