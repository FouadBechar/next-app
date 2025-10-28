import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Link,
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetConfirmationEmailProps {
  userEmail: string;
  loginUrl?: string;
}

export const PasswordResetConfirmationEmail = ({
  userEmail,
  loginUrl = 'http://localhost:3000/auth/login',
}: PasswordResetConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your password has been reset successfully</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Password Reset Successful</Heading>
          <Text style={text}>Hello {userEmail},</Text>
          <Text style={text}>
            Your password has been reset successfully. You can now sign in to
            your account with your new password.
          </Text>
          <Section style={buttonContainer}>
            <Link style={button} href={loginUrl}>
              Sign In
            </Link>
          </Section>
          <Text style={text}>
            If you did not reset your password, please contact us immediately as
            your account may have been compromised.
          </Text>
          <Text style={footer}>
            This is an automated message, please do not reply to this email.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: '600',
  lineHeight: '1.25',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const text = {
  color: '#555',
  fontSize: '16px',
  lineHeight: '1.5',
  marginBottom: '24px',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const button = {
  backgroundColor: '#3b82f6',
  borderRadius: '4px',
  color: '#fff',
  display: 'inline-block',
  fontSize: '16px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  marginTop: '32px',
  textAlign: 'center' as const,
};

export default PasswordResetConfirmationEmail;
