import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    host: process.env.EMAIL_HOST,
    port: 587,
    // secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});


type tMailOptions = {to: string, subject: string, text: string, html: string};

export async function sendEmail(mail_options: tMailOptions) {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: mail_options.to,
            subject: mail_options.subject,
            text: mail_options.text,
            html: mail_options.html,
        };

        const info = await transporter.sendMail(mailOptions);
        return !!info.messageId;
    }
    catch (e) {
       return null;
    }
}
