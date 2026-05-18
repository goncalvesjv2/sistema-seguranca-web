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

export async function send2FACode(email, code) {

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Código de Verificação 2FA',
        text: `Seu código de verificação é: ${code}`
    });

}