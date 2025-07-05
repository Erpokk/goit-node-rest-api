import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
    const transport = nodemailer.createTransport({
        host: "smtp.ukr.net",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,     // твоє ім'я пошти
            pass: process.env.EMAIL_PASSWORD, // пароль застосунку
        },
    });

    await transport.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    });
};