import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ResetPasswordEmailProps {
  otp: string;
}

export const ResetPasswordEmail = ({ otp }: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={text}>
            You requested to reset your password. Use the code below to confirm
            your email and reset your password:
          </Text>

          <Section style={codeContainer}>
            <Text style={code}>{otp}</Text>
          </Section>

          <Text style={text}>
            If you didn&apos;t request a password reset, you can safely ignore
            this email.
          </Text>
          <Text style={text}>This link will expire in 1 hour.</Text>
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

const codeContainer = {
  background: '#f4f4f4',
  borderRadius: '4px',
  padding: '16px',
  marginBottom: '24px',
  textAlign: 'center' as const,
};

const code = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '4px',
};

export default ResetPasswordEmail;
