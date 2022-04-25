const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async ({ to, subject, html }) => {
  const msg = {
    to, // Change to your recipient
    from: process.env.SENDGRID_SENDER, // Change to your verified sender
    subject,
    html,
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
}

module.exports = sendEmail
