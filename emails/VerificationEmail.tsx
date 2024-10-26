import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from "@react-email/components"

interface VerificaitonEmailProps{
    username:string;
    otp:string;
}
export default function VerificationEmail({username,otp}:VerificaitonEmailProps){
    return(
        <Html lang="en" dir="ltr">
            <Head>
                <title>
                    Verification Code
                </title>
                <Font fontFamily="Roboto"
                fallbackFontFamily="Verdana"
                webFont={{
                    url:'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92fr1Mu4mxKKTU1Kg.woff2',
                    format:'woff2'
                }}
                fontWeight={400}
                fontStyle="normal"
                />
                
            </Head>
            <Preview>Here&apos;s Yours verification code :{otp}</Preview>
            <Section>
                <Row>
                    <Heading as="h2">Hello {username}</Heading>
                </Row>
                <Row>
                    <text>
                        Thank you for registering. plesse use the follwoing verification code to complete your registration
                    </text>
                </Row>
                <Row>
                    {otp}
                </Row>
                <Row>
                    <Text>
                        if you dont find resend it 
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}