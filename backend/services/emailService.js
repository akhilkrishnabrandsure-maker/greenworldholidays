const nodemailer = require('nodemailer');

require('dotenv').config();


const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to your provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'SET' : 'NOT SET');

async function sendOTPEmail(to, otp) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: ' Green World Holidays OTP Code',
    text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
  };

  await transporter.sendMail(mailOptions);
  console.log(`OTP email sent to ${to}`);
  console.log(`${to} otp ${otp}`)
}

module.exports = { sendOTPEmail }; 