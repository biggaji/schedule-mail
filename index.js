const { config } = require("dotenv");
if (process.env.NODE_ENV !== "production") {
	config();
}

const cron = require("node-cron");
const nodemailer = require("nodemailer");

// send an email every 2 minute
try {
	cron.schedule("*/2 * * * *", async function() {			
		try {
			const mailTransport = nodemailer.createTransport({
				host: process.env.SMTP_HOST,
				port: parseInt(process.env.SMTP_PORT),
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASS
				}
			});
	
			const mailReceiver = process.env.MAIL_RECIEVER;
			let delivered = false;
	
			const mailObject = {
				from: "'Node Cron Test' <nodecron.test@mail.com>",
				to: `${mailReceiver}`,
				subject: "Testing node cron",
				html: `
					<h1>Do cron job work in production?</h1>
					<p>If this mail delivers every 2 mins, then it works, else it doesn't.</p>
				`
			};
	
			const mailResponse = await mailTransport.sendMail(mailObject);
	
			if (mailResponse.accepted.length === 1 && mailResponse.accepted[0] === mailReceiver) {
				delivered = true;
				console.log("mail delivered")
			} else {
				console.log("mail delivery failed");
			};
	
			console.log(delivered);
		} catch (error) {
			console.error("An error occured while sending mail", error);
		}
	},
	{ timezone: "Africa/Lagos" });
} catch (error) {
	console.error('An error occured while setting up cron job', error);
}