import { Resend } from "resend";
import { ContactRequest, IEmailService } from "@/core/domain/models/Contact";

// Se instancia con la variable de entorno RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

// El dominio verificado en Resend desde el que se enviará
const FROM_ADDRESS = "info@arianaservicios.com.ar";
// La dirección interna que recibirá las consultas del formulario
const TO_INTERNAL = "presupuestos@arianaservicios.com.ar";

export class ResendEmailService implements IEmailService {
  async sendContactEmail(request: ContactRequest): Promise<boolean> {
    try {
      // 1. Email interno: notificación a Ariana con todos los datos del cliente
      const { error: internalError } = await resend.emails.send({
        from: `Ariana Servicios Web <${FROM_ADDRESS}>`,
        to: [TO_INTERNAL],
        replyTo: request.email,
        subject: `Nueva consulta de ${request.name} — Web arianaservicios.com.ar`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #0d9488; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">📨 Nueva Consulta desde la Web</h1>
            </div>
            <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b; width: 140px;">Nombre / Consorcio</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.name}</td>
                </tr>
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Email</td>
                  <td style="padding: 10px 0;"><a href="mailto:${request.email}" style="color: #0d9488;">${request.email}</a></td>
                </tr>
                ${request.phone ? `
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Teléfono</td>
                  <td style="padding: 10px 0;">${request.phone}</td>
                </tr>` : ""}
                ${request.address ? `
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Ubicación</td>
                  <td style="padding: 10px 0;">${request.address}</td>
                </tr>` : ""}
                <tr style="border-top: 1px solid #e2e8f0;">
                  <td style="padding: 10px 0; font-weight: bold; color: #64748b; vertical-align: top;">Mensaje</td>
                  <td style="padding: 10px 0; white-space: pre-wrap;">${request.message}</td>
                </tr>
              </table>
              <div style="margin-top: 24px; padding: 16px; background: #ccfbf1; border-radius: 8px; font-size: 13px; color: #0f766e;">
                💡 Podés responder directamente a este email para contactar al cliente.
              </div>
            </div>
          </div>
        `,
      });

      if (internalError) {
        console.error("[ResendEmailService] Error enviando email interno:", internalError);
        return false;
      }

      // 2. Email de confirmación al cliente
      await resend.emails.send({
        from: `Ariana Servicios <${FROM_ADDRESS}>`,
        to: [request.email],
        subject: "Recibimos tu consulta — Ariana Servicios",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #0d9488; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">✅ ¡Recibimos tu consulta, ${request.name}!</h1>
            </div>
            <div style="background: #f8fafc; padding: 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 16px;">Gracias por contactarnos. Revisamos tu mensaje y te responderemos a la brevedad.</p>
              <p style="margin: 0 0 24px; color: #64748b; font-size: 14px;">Nuestro horario de atención es de <strong>Lunes a Viernes de 10:00 a 18:00 hs</strong>. Si tu consulta es urgente, también podés escribirnos por WhatsApp.</p>
              <a href="https://wa.me/5492235220338" style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Escribirnos por WhatsApp
              </a>
              <hr style="margin: 32px 0; border: none; border-top: 1px solid #e2e8f0;" />
              <p style="margin: 0; font-size: 12px; color: #94a3b8;">
                Ariana Servicios — Mar del Plata<br>
                <a href="https://arianaservicios.com.ar" style="color: #0d9488;">arianaservicios.com.ar</a>
              </p>
            </div>
          </div>
        `,
      });

      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error inesperado:", error);
      return false;
    }
  }
}
