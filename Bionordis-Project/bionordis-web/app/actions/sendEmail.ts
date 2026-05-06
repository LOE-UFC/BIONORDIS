"use client"; 


import { Resend } from 'resend';

// Adicione RESEND_API_KEY no seu .env.local
const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  try {
    await resend.emails.send({
      from: 'Bionordis <onboarding@resend.dev>', // No futuro, use o seu domínio próprio
      to: ['loe@ufc.br'], // O e-mail do laboratório que recebe as mensagens
      subject: `[Bionordis Contact] ${subject}`,
      replyTo: email,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    });
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
}