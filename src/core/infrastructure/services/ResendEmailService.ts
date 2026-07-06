import { Resend } from "resend";
import { ContactRequest, IEmailService } from "@/core/domain/models/Contact";
import { QuoteRequest } from "@/core/domain/models/Quote";
import { CareerRequest } from "@/core/domain/models/Career";
import { OrderRequest } from "@/core/domain/models/Order";

// Se instancia con la variable de entorno RESEND_API_KEY
const resend = new Resend(process.env.RESEND_API_KEY);

// El dominio verificado en Resend desde el que se enviará
const FROM_ADDRESS = "info@arianaservicios.com.ar";

// Direcciones específicas de correo según canal
const TO_QUOTE = "presupuestos@arianaservicios.com.ar";
const TO_CAREER = "cv@arianaservicios.com.ar";
const TO_ORDER = "ventas@arianaservicios.com.ar";

export class ResendEmailService implements IEmailService {
  
  // 1. Correo de Contacto Común
  async sendContactEmail(request: ContactRequest): Promise<boolean> {
    try {
      const { error: internalError } = await resend.emails.send({
        from: `Ariana Servicios Web <${FROM_ADDRESS}>`,
        to: [TO_QUOTE],
        replyTo: request.email,
        subject: `Nueva consulta de ${request.name} — Web arianaservicios.com.ar`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #e5774d; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">📨 Nueva Consulta de Contacto</h1>
            </div>
            <div style="background: #fdfaf8; padding: 32px; border: 1px solid #fcf1e8; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825; width: 140px;">Nombre / Lugar</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.name}</td>
                </tr>
                <tr style="border-top: 1px solid #fcf1e8;">
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Email</td>
                  <td style="padding: 10px 0;"><a href="mailto:${request.email}" style="color: #e5774d;">${request.email}</a></td>
                </tr>
                ${request.phone ? `
                <tr style="border-top: 1px solid #fcf1e8;">
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Teléfono</td>
                  <td style="padding: 10px 0;">${request.phone}</td>
                </tr>` : ""}
                ${request.address ? `
                <tr style="border-top: 1px solid #fcf1e8;">
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Dirección</td>
                  <td style="padding: 10px 0;">${request.address}</td>
                </tr>` : ""}
                <tr style="border-top: 1px solid #fcf1e8;">
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825; vertical-align: top;">Mensaje</td>
                  <td style="padding: 10px 0; white-space: pre-wrap;">${request.message}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      });

      if (internalError) {
        console.error("[ResendEmailService] Error enviando email contacto:", internalError);
        return false;
      }
      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error en contacto:", error);
      return false;
    }
  }

  // 2. Correo de Cotización Detallada (Presupuestos)
  async sendQuoteEmail(request: QuoteRequest): Promise<boolean> {
    try {
      // Mapear adjuntos si existen
      const attachments = request.photos?.map(photo => ({
        filename: photo.filename,
        content: photo.content,
      })) || [];

      // Estructurar HTML con lógica condicional para consorcios
      let consorcioHtml = "";
      if (request.establishmentType.toLowerCase() === "consorcio") {
        consorcioHtml = `
          <tr style="border-top: 1px solid #fcf1e8; background: #fcf1e8/30;">
            <td colspan="2" style="padding: 10px 0; font-weight: bold; color: #b2452a;">📋 Datos del Consorcio y Administración</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8c3825; padding-left: 10px;">Nombre Adm.</td>
            <td style="padding: 8px 0; color: #1e293b;">${request.adminName}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8c3825; padding-left: 10px;">Dirección Adm.</td>
            <td style="padding: 8px 0; color: #1e293b;">${request.adminAddress}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #8c3825; padding-left: 10px;">Contacto Adm.</td>
            <td style="padding: 8px 0; color: #1e293b;">${request.adminContact}</td>
          </tr>
        `;
      }

      // Email interno de cotización
      const { error: quoteError } = await resend.emails.send({
        from: `Ariana Presupuestos <${FROM_ADDRESS}>`,
        to: [TO_QUOTE],
        replyTo: request.email,
        subject: `[PRESUPUESTO] Solicitud de ${request.name} (${request.establishmentType})`,
        attachments: attachments,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #d65c36; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">📋 Nueva Solicitud de Presupuesto</h1>
            </div>
            <div style="background: #fdfaf8; padding: 32px; border: 1px solid #fcf1e8; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825; width: 180px;">Solicitante (Nombre)</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Cargo</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.role}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Email</td>
                  <td style="padding: 10px 0;"><a href="mailto:${request.email}" style="color: #e5774d;">${request.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Teléfono</td>
                  <td style="padding: 10px 0;">${request.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Tipo Establecimiento</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.establishmentType}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Dirección Establecimiento</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.address}</td>
                </tr>
                
                ${consorcioHtml}

                <tr style="border-top: 1px solid #fcf1e8; background: #fdf2f6/30;">
                  <td colspan="2" style="padding: 10px 0; font-weight: bold; color: #b52254;">⚙️ Detalles del Servicio Solicitado</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8c3825;">Frecuencia y Días</td>
                  <td style="padding: 8px 0; color: #1e293b;">${request.frequencyHoursDays}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8c3825;">Horarios y Preferencia</td>
                  <td style="padding: 8px 0; color: #1e293b;">${request.preferredSchedule}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8c3825;">¿Cuenta con servicio actual?</td>
                  <td style="padding: 8px 0; color: #1e293b;">${request.hasCurrentService.toUpperCase()}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #8c3825;">Fecha Comienzo Estimada</td>
                  <td style="padding: 8px 0; color: #1e293b;">${request.estimatedStartDate}</td>
                </tr>
                
                <tr style="border-top: 1px solid #fcf1e8;">
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825; vertical-align: top;">Requerimientos / Notas</td>
                  <td style="padding: 10px 0; white-space: pre-wrap; color: #1e293b;">${request.message}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #8c3825;">Fotos Adjuntas</td>
                  <td style="padding: 10px 0; color: #1e293b;">${attachments.length > 0 ? `${attachments.length} foto(s) cargada(s)` : "Ninguna"}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      });

      if (quoteError) {
        console.error("[ResendEmailService] Error enviando email cotizacion:", quoteError);
        return false;
      }

      // Email de confirmación al cliente
      await resend.emails.send({
        from: `Ariana Servicios <${FROM_ADDRESS}>`,
        to: [request.email],
        subject: "Recibimos tu solicitud de presupuesto — Ariana Servicios",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #d65c36; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">✅ ¡Cotización Solicitada, ${request.name}!</h1>
            </div>
            <div style="background: #fdfaf8; padding: 32px; border: 1px solid #fcf1e8; border-top: none; border-radius: 0 0 12px 12px;">
              <p>Muchas gracias por contactarnos. Hemos recibido correctamente tu solicitud detallada de presupuesto para el establecimiento ubicado en <strong>${request.address}</strong>.</p>
              <p>Un supervisor técnico de nuestro equipo evaluará los requerimientos de limpieza y se pondrá en contacto contigo en breve para coordinar una propuesta formal o coordinar una visita técnica si fuese necesario.</p>
              <p style="color: #8c3825; font-size: 14px;"><strong>Información de Privacidad:</strong> Tus datos personales y las imágenes provistas del establecimiento están protegidos por nuestras políticas de confidencialidad de datos. Garantizamos que no recibirás Spam de nuestra parte.</p>
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #fcf1e8;" />
              <p style="font-size: 12px; color: #8c3825;">Ariana Servicios — Mar del Plata | <a href="https://arianaservicios.com.ar" style="color: #e5774d;">arianaservicios.com.ar</a></p>
            </div>
          </div>
        `,
      });

      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error en cotización:", error);
      return false;
    }
  }

  // 3. Correo para Postulaciones Laborales (CVs)
  async sendCareerEmail(request: CareerRequest): Promise<boolean> {
    try {
      const attachments = [
        {
          filename: request.cvFile.filename,
          content: request.cvFile.content,
        }
      ];

      // Email interno de CV
      const { error: cvError } = await resend.emails.send({
        from: `Ariana Selección <${FROM_ADDRESS}>`,
        to: [TO_CAREER],
        replyTo: request.email,
        subject: `[CV TRABAJO] Postulación de ${request.name}`,
        attachments: attachments,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #7f1e40; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">💼 Nueva Postulación Laboral</h1>
            </div>
            <div style="background: #fdf2f6; padding: 32px; border: 1px solid #fce5ee; border-top: none; border-radius: 0 0 12px 12px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #961f48; width: 140px;">Nombre Completo</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.name}</td>
                </tr>
                <tr style="border-top: 1px solid #fce5ee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #961f48;">Email</td>
                  <td style="padding: 10px 0;"><a href="mailto:${request.email}" style="color: #d5366c;">${request.email}</a></td>
                </tr>
                <tr style="border-top: 1px solid #fce5ee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #961f48;">Teléfono</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.phone}</td>
                </tr>
                <tr style="border-top: 1px solid #fce5ee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #961f48; vertical-align: top;">Carta de Presentación</td>
                  <td style="padding: 10px 0; white-space: pre-wrap; color: #1e293b;">${request.message}</td>
                </tr>
                <tr style="border-top: 1px solid #fce5ee;">
                  <td style="padding: 10px 0; font-weight: bold; color: #961f48;">CV Adjunto</td>
                  <td style="padding: 10px 0; color: #1e293b;">${request.cvFile.filename}</td>
                </tr>
              </table>
            </div>
          </div>
        `,
      });

      if (cvError) {
        console.error("[ResendEmailService] Error enviando email CV:", cvError);
        return false;
      }

      // Email de confirmación al postulante
      await resend.emails.send({
        from: `Ariana Recursos Humanos <${FROM_ADDRESS}>`,
        to: [request.email],
        subject: "Recibimos tu postulación — Ariana Servicios",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #7f1e40; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">✅ ¡CV Recibido, ${request.name}!</h1>
            </div>
            <div style="background: #fdf2f6; padding: 32px; border: 1px solid #fce5ee; border-top: none; border-radius: 0 0 12px 12px;">
              <p>Hola. Queremos confirmarte que hemos recibido correctamente tu currículum para formar parte del equipo de Ariana Servicios.</p>
              <p>Tu postulación ha sido guardada en nuestra base de datos del departamento de Selección. Cuando iniciemos búsquedas laborales que coincidan con tu experiencia y perfil, nos pondremos en contacto contigo.</p>
              <p>Agradecemos tu tiempo e interés en nuestra empresa de limpieza.</p>
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #fce5ee;" />
              <p style="font-size: 12px; color: #961f48;">Departamento de Selección — Ariana Servicios | Mar del Plata</p>
            </div>
          </div>
        `,
      });

      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error en postulación laboral:", error);
      return false;
    }
  }

  // 4. Correo de Pedidos del Carrito de Compras (Ventas)
  async sendOrderEmail(request: OrderRequest): Promise<boolean> {
    try {
      // Construir tabla de productos
      const itemsHtml = request.items.map(item => `
        <tr style="border-bottom: 1px solid #fcf1e8;">
          <td style="padding: 10px 0; color: #1e293b;">${item.title}</td>
          <td style="padding: 10px 0; text-align: center; color: #1e293b;">${item.quantity}</td>
        </tr>
      `).join("");

      // Email interno de ventas
      const { error: orderError } = await resend.emails.send({
        from: `Ariana Ventas <${FROM_ADDRESS}>`,
        to: [TO_ORDER],
        replyTo: request.email,
        subject: `[PEDIDO VENTAS] Nuevo pedido de ${request.name}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #e5774d; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">🛒 Nuevo Pedido de Insumos</h1>
            </div>
            <div style="background: #fdfaf8; padding: 32px; border: 1px solid #fcf1e8; border-top: none; border-radius: 0 0 12px 12px;">
              <h3 style="color: #8c3825; margin-top: 0;">Datos del Cliente</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #8c3825; width: 140px;">Nombre</td>
                  <td style="padding: 6px 0; color: #1e293b;">${request.name}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #8c3825;">Email</td>
                  <td style="padding: 6px 0;"><a href="mailto:${request.email}" style="color: #e5774d;">${request.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #8c3825;">Teléfono</td>
                  <td style="padding: 6px 0; color: #1e293b;">${request.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #8c3825;">Dirección de Entrega</td>
                  <td style="padding: 6px 0; color: #1e293b;">${request.address}</td>
                </tr>
                ${request.notes ? `
                <tr>
                  <td style="padding: 6px 0; font-weight: bold; color: #8c3825; vertical-align: top;">Notas</td>
                  <td style="padding: 6px 0; color: #1e293b; white-space: pre-wrap;">${request.notes}</td>
                </tr>` : ""}
              </table>

              <h3 style="color: #8c3825; border-bottom: 2px solid #e5774d; padding-bottom: 8px;">Detalle del Pedido</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <thead>
                  <tr style="color: #8c3825; border-bottom: 1px solid #e5774d;">
                    <th style="padding: 8px 0; text-align: left;">Producto</th>
                    <th style="padding: 8px 0; text-align: center; width: 80px;">Cant.</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
            </div>
          </div>
        `,
      });

      if (orderError) {
        console.error("[ResendEmailService] Error enviando email Ventas:", orderError);
        return false;
      }

      // Email de confirmación al comprador
      await resend.emails.send({
        from: `Ariana Tienda <${FROM_ADDRESS}>`,
        to: [request.email],
        subject: "Recibimos tu solicitud de pedido — Ariana Insumos",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="background: #e5774d; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 20px;">✅ Solicitud de Pedido Recibida</h1>
            </div>
            <div style="background: #fdfaf8; padding: 32px; border: 1px solid #fcf1e8; border-top: none; border-radius: 0 0 12px 12px;">
              <p>Hola, <strong>${request.name}</strong>. Muchas gracias por interesarte en nuestros insumos profesionales de limpieza.</p>
              <p>Hemos registrado tu solicitud de pedido para ser entregada en <strong>${request.address}</strong>. A continuación, el detalle de tu selección:</p>
              
              <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
                <thead>
                  <tr style="color: #8c3825; border-bottom: 1px solid #e5774d;">
                    <th style="padding: 8px 0; text-align: left;">Producto</th>
                    <th style="padding: 8px 0; text-align: center; width: 80px;">Cant.</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>

              <p>Un representante de nuestro equipo comercial de Ventas se contactará contigo a la brevedad por teléfono o email para acordar los precios finales, la facturación correspondientes (facturas A o B) y coordinar el día y horario de entrega.</p>
              <p>Si tenés alguna duda urgente, también podés consultarnos directamente a nuestro WhatsApp oficial.</p>
              <hr style="margin: 24px 0; border: none; border-top: 1px solid #fcf1e8;" />
              <p style="font-size: 12px; color: #8c3825;">División de Insumos & Ventas — Ariana Servicios | Mar del Plata</p>
            </div>
          </div>
        `,
      });

      return true;
    } catch (error) {
      console.error("[ResendEmailService] Error en pedido de ventas:", error);
      return false;
    }
  }
}
