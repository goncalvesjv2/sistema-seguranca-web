import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export async function sendRecoveryEmail(email, token) {
  const link = `http://localhost:5173/reset-password?token=${token}`;

  console.log('RECOVERY LINK:', link);

  // EMAIL REAL
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Recuperação de senha',
    text: `Clique para redefinir sua senha: ${link}`
  });
}