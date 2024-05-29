const mailOTP = (otp: string) => ({
    subject: "OTP",
    text: "OTP code",
    html: `<p>Your code is: <b>${otp}</b></p>`,
});

export const mailTemplates = {
    mailOTP
};
