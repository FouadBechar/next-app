import { AuthForm } from '@/components/auth/auth-form';
import { SignupForm } from '@/components/auth/signup-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up',
  description: 'Create a new account',
};

export default function SignupPage() {
  return (
    <AuthForm
      title="Create an Account"
      description="Enter your details to create a new account"
    >
      <SignupForm />
    </AuthForm>
  );
}
