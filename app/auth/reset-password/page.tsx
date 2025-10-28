import { AuthForm } from '@/components/auth/auth-form';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your password',
};

export default function ResetPasswordPage() {
  return (
    <AuthForm
      title="Reset Password"
      description="Enter your email to confirm your password reset"
    >
      <ResetPasswordForm />
    </AuthForm>
  );
}
