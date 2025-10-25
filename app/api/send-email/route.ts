import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, phone, company, message } = body;

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-bottom: 20px; border-bottom: 2px solid #007bff; padding-bottom: 10px;">🚀 New Contact Form Submission</h2>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Name:</strong>
              <span style="margin-left: 10px; color: #333;">${name}</span>
            </div>
            
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Email:</strong>
              <a href="mailto:${email}" style="margin-left: 10px; color: #007bff; text-decoration: none;">${email}</a>
            </div>
            
            ${phone ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Phone:</strong>
              <a href="tel:${phone}" style="margin-left: 10px; color: #007bff; text-decoration: none;">${phone}</a>
            </div>
            ` : ''}
            
            ${company ? `
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Company:</strong>
              <span style="margin-left: 10px; color: #333;">${company}</span>
            </div>
            ` : ''}
            
            <div style="margin-top: 20px;">
              <strong style="color: #555;">Message:</strong>
              <div style="margin-top: 10px; padding: 15px; background-color: #f8f9fa; border-left: 4px solid #007bff; border-radius: 5px;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center; color: #666; font-size: 12px;">
              Sent from Clooyzi Contact Form
            </div>
          </div>
        </div>
      `,
      replyTo: email,
    });

    return Response.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return Response.json({ 
      success: false, 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
