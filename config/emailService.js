const nodemailer = require('nodemailer');

class EmailService {
  static #instance = null;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'marturiesco@gmail.com',
        pass: 'jcshifzdjmgldxnc', // La contraseña de aplicación que generaste
      },
    });
  }

  sendEmail(to, subject, html, attachments = []) {
    return this.transporter.sendMail({
      from: 'marturiesco@gmail.com',
      to,
      subject,
      html,
      attachments,
    });
  }

  sendAppointmentInfo(user, appointment) {
    console.log('Sending appointment info:', appointment);
    console.log('Sending user info:', user);
    return this.sendEmail(
      user.email,
      'Turno agendado',
      `<h1>Hola! Se agendó tu turno correctamente para el día ${appointment.date}, a las ${appointment.time}. ¡Muchas gracias!</h1>`
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