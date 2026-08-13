import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface PasswordResetEmailProps {
  companyName: string;
  url: string;
}

// TODO: Update the LOGO_URL in production
const LOGO_URL = `http://localhost:3000/logo.png`;

const PasswordResetEmail = ({ companyName, url }: PasswordResetEmailProps): React.ReactElement => (
  <Tailwind>
    <Html>
      <Head />

      <Body className="bg-bg-2 m-0 text-center font-sans">
        <Preview>Reset your password</Preview>
        <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-160">
          <Section>
            <Section className="bg-bg mobile:px-2 px-6 py-4">
              <Section className="bg-bg-2 mobile:px-6 mobile:py-12 rounded-[8px] px-10 py-16 text-center">
                <Section className="mb-3">
                  <Img
                    src={LOGO_URL}
                    alt="Linknest Logo"
                    width={48}
                    className="mx-auto mb-5 block"
                  />
                  <Heading as="h1" className="font-28 text-fg m-0 font-sans">
                    Reset your password
                  </Heading>
                </Section>

                <Text className="font-16 text-fg-2 mx-auto mt-0 mb-8 max-w-95 text-center font-sans">
                  Someone has requested a link to change your password in{" "}
                  <span className="font-bold">{companyName}</span>, and you can do this through the
                  link below.
                </Text>

                <Button
                  className="box-border w-full rounded-[8px] bg-indigo-600 p-3 text-center font-semibold text-white"
                  href={url}
                >
                  Change your password
                </Button>

                <Text className="font-13 text-fg-3 mx-auto mt-8 mb-0 max-w-100 text-center font-sans">
                  If you didn&apos;t request this, please ignore this email. Your password
                  won&apos;t change until you access the link above and create a new one.
                </Text>
              </Section>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

PasswordResetEmail.PreviewProps = {
  companyName: "Linknest",
  url: "https://linknest.example.com/",
} satisfies PasswordResetEmailProps;

export default PasswordResetEmail;
