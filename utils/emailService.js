import nodemailer from "nodemailer"

let testAccount = await nodemailer.createTestAccount();

let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
        user: testAccount.user,
        pass: testAccount.pass,
    },
});

const sendEmail = async (meeting, participants) => {
    console.log("Sending Mail", participants)
    try {
        let participantNames = participants.map(p => p.name).join(", ")
        let emails = participants.map(p => p.email).join(", ")
        let text = `Meeting Scheduled from ${meeting.startTime} to ${meeting.endTime} with participants ${participantNames}`
        let info = await transporter.sendMail({
            from: '"Anish Kumar 👻" <anish12k07@gmail.com>',
            to: emails,
            subject: "Meeting Scheduled",
            text: text,
        });
        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    }
    catch (err) {
        console.log("Error Sending Mail", err)
    }
}

export default sendEmail

