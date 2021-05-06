import nodeMailer from 'nodemailer';
import { env} from '../helpers/core.helper';

const sendEmail = async(options) => {

	const transporter =  nodeMailer.createTransport({
		host: env("SMTP_HOST"),
		port: env("SMTP_PORT"),
		secure: false,
		auth: {
			user: env("SMTP_EMAIL"),
			pass: env("SMTP_PASSWORD")
		}
	});

  const fromName = (options.from === undefined) ? env("FROM_NAME") : options.from;
	const message = {
		from: `${fromName} <${process.env.SMTP_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		text: options.message
	};

	await transporter.sendMail(message);
}


export default sendEmail;
