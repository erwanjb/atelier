import mg from 'nodemailer-mailgun-transport';
import mailer from "nodemailer";

const auth = {
    auth: {
      api_key: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAINE,
      host: process.env.MAILGUN_HOST,
    }
}

const transport = mailer.createTransport(mg(auth));

export default transport;