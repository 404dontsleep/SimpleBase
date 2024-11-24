import { createTransport } from "nodemailer";
import config from "../../config/config";

export default async function sendMail(
  to: string,
  subject: string,
  text: string,
  html?: string
) {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: config.SMTP_EMAIL,
      pass: config.SMTP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: config.SMTP_EMAIL,
    to,
    subject,
    text,
    html,
  });

  console.log("Message sent: %s", info.messageId);

  return info;
}

export async function sendVerifyEmail(to: string, code: string) {
  const subject = "Verify your email";
  const text = `Verify your email with this code: ${code}`;
  await sendMail(to, subject, text);
}
