import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: "sales@dprprop.com",
    pass: "ufqy vlph geix jfgr",
  },
  tls: {
    rejectUnauthorized: false
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Set the email subject. Use 'Brochure Form Submission' if subject is not provided.
  const emailSubject = subject || 'Brochure Form Submission';

  // Create mail options based on provided data
  const mailOptions = {
    from: "sales@dprprop.com",
    to: 'info@dprprop.com',
    subject: emailSubject,
    html: `
      <h2>${emailSubject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone Number:</strong> ${phone}</p>` : ''}
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

export { router as MailerRouter };
