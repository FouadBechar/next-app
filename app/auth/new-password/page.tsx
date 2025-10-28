import { AuthForm } from '@/components/auth/auth-form';
import { NewPasswordForm } from '@/components/auth/new-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Set New Password',
  description: 'Create a new password for your account',
};

export default function NewPasswordPage() {
  return (
    <AuthForm
      title="Set New Password"
      description="Create a new password for your account"
    >
      <NewPasswordForm />
    </AuthForm>
  );
}
