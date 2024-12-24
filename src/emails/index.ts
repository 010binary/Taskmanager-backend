import path from "path";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.toplinetrading.co",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./handlebars"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./handlebars"),
  extName: ".handlebars",
};

//transporter.use("compile", hbs(handlebarOptions));


export default function sendMail(
  usermail: string,
  type: string,
  values: Record<string, any>
): void {
  let subject: string, template: string;

  switch (type) {
    case "register":
      subject = "Welcome to the PlanPal family";
      template = "register";
      break;
    case "login":
      subject = "New Login Alert";
      template = "login";
      break;
    case "reminder":
      subject = "Friendly reminder from PlanPal";
      template = "reminder";
      break;
    case "forgotpassword":
      subject = "Forgot Password link";
      template = "forgotpassword";
      break;
    default:
      console.log("Invalid email type");
      return;
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: usermail,
    subject: subject,
    template: template,
    context: {
      ...values,
    },
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return;
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}
