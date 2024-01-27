import nodemailer from "nodemailer";
import "dotenv/config";

const {UKR_NET_PASSWORD, UKR_NET_FROM} = process.env;

const nodemailerConfig = {
    host: "smtp.ukr.net",
    port: 465, 
    secure: true,
    auth: {
        user: UKR_NET_FROM,
        pass: UKR_NET_PASSWORD,
    }
};

const tranport = nodemailer.createTransport(nodemailerConfig);

const email = {
    from: UKR_NET_FROM,
    to: "befebop339@gosarlar.com",
    subject: "Test email",
    html: "<strong>Test email</strong>"
};

tranport.sendMail(email)
    .then(()=> console.log("Email send success"))
    .catch(error => console.log(error.message));