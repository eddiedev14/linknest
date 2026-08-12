import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "react-email";

interface PasswordResetEmailProps {
  companyName: string;
  url: string;
}

// TODO: Update the LOGO_URL in production
const LOGO_URL = `http://localhost:5173/logo.png`;

const PasswordResetEmail = ({ companyName, url }: PasswordResetEmailProps) => (
  <Tailwind>
    <Html>
      <Head />

      <Body className="bg-bg-2 m-0 text-center font-sans">
        <Preview>Reset your password</Preview>
        <Container className="mobile:mt-0 mx-auto mt-8 w-full max-w-160">
          <Section>
            <Section className="bg-bg mobile:px-2 px-6 py-4">
              <Section className="mb-3 px-6">
                <Row>
                  <Column className="w-1/2 py-1.75 align-middle">
                    <Row>
                      <Column className="w-8 align-middle">
                        <Img src={LOGO_URL} alt="Linknest logo" width={23} className="block" />
                      </Column>
                    </Row>
                  </Column>
                  <Column align="right" className="w-1/2 py-1.75 align-middle">
                    <Text className="font-13 -mt-0 text-right font-sans">
                      <span className="text-fg-3 font-semibold">{companyName}</span>
                    </Text>
                  </Column>
                </Row>
              </Section>

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
                  Someone has requested a link to change your password, and you can do this through
                  the link below.
                </Text>

                <Section className="mb-6 text-center">
                  <Button
                    href={url}
                    className="bg-fg font-16 text-fg-inverted inline-block rounded-lg px-7 py-4 text-center font-sans leading-6"
                  >
                    Change password
                  </Button>
                </Section>

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
