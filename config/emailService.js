const nodemailer = require('nodemailer');

class EmailService {
  static #instance = null;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });
  }

  sendEmail(to, subject, html, attachments = []) {
    return this.transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject,
      html,
      attachments,
    });
  }

  sendAppointmentInfo(user, appointment) {
    console.log('Sending appointment info:', appointment);
    console.log('Sending user info:', appointment);
    return this.sendEmail(
      user.email,
      'Turno agendado',
      `<h1>Hola! Se agendó tu turno correctamente para el dia ${appointment.date}, a las ${appointment.time}. Muchas gracias!</h1>`
    );
  }

  sendAppointmentDeleted(user) {
    console.log('Sending appointment deleted:', user);
    return this.sendEmail(
      user.email,
      'Turno cancelado',
      `<h1>Hola! Se canceló tu turno.</h1>`
    );
  }

  static getInstance() {
    if (!EmailService.#instance) {
      EmailService.#instance = new EmailService();
    }
    return EmailService.#instance;
  }
}

module.exports = EmailService;