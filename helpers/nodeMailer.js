const nodemailer = require("nodemailer");


const sendEmail = async (subject, text) => {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'vceanid@gmail.com',
      pass: 'Bukaajay.4@',
    },
  });

  let info = await transporter.sendMail({
    from: '"Yuhuuuu 👻" <vcean.id@gmail.com>', 
    to: "tn.wahyurahmana@gmail.com", 
    subject: subject, 
    text: text, 
    html: `</b>${text}</b>`,
  });
}

module.exports = sendEmail