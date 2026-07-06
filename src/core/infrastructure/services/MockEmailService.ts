import { ContactRequest, IEmailService } from "@/core/domain/models/Contact";
import { QuoteRequest } from "@/core/domain/models/Quote";
import { CareerRequest } from "@/core/domain/models/Career";
import { OrderRequest } from "@/core/domain/models/Order";

export class MockEmailService implements IEmailService {
  
  async sendContactEmail(request: ContactRequest): Promise<boolean> {
    console.log("\n[MOCK EMAIL SERVICE] ----- ENVÍO DE EMAIL DE CONTACTO -----");
    console.log("De:", request.name, `(${request.email})`);
    console.log("Teléfono:", request.phone);
    console.log("Dirección:", request.address || "N/A");
    console.log("Mensaje:", request.message);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("[MOCK EMAIL SERVICE] ----- FIN ENVÍO CONTACTO [ÉXITO] -----\n");
    return true;
  }

  async sendQuoteEmail(request: QuoteRequest): Promise<boolean> {
    console.log("\n[MOCK EMAIL SERVICE] ----- ENVÍO DE SOLICITUD DE COTIZACIÓN (PRESUPUESTOS) -----");
    console.log("Nombre Solicitante:", request.name);
    console.log("Cargo:", request.role);
    console.log("Email:", request.email);
    console.log("Teléfono:", request.phone);
    console.log("Tipo Establecimiento:", request.establishmentType);
    console.log("Dirección Establecimiento:", request.address);
    
    if (request.establishmentType.toLowerCase() === "consorcio") {
      console.log("  [Datos Administración Consorcio]:");
      console.log("  Nombre Adm:", request.adminName);
      console.log("  Dirección Adm:", request.adminAddress);
      console.log("  Contacto Adm:", request.adminContact);
    }
    
    console.log("Frecuencia y Caudal de Hs:", request.frequencyHoursDays);
    console.log("Horarios y Preferencia:", request.preferredSchedule);
    console.log("¿Cuenta con servicio actual?:", request.hasCurrentService);
    console.log("Fecha Comienzo Estimada:", request.estimatedStartDate);
    console.log("Mensaje / Requerimientos:", request.message);
    console.log("Fotos Adjuntas:", request.photos?.length || 0, "foto(s)");
    if (request.photos && request.photos.length > 0) {
      request.photos.forEach((photo, idx) => {
        console.log(`  - Foto ${idx + 1}: ${photo.filename} (${photo.mimeType}) - Buffer Size: ${photo.content.length} bytes`);
      });
    }

    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("[MOCK EMAIL SERVICE] ----- FIN ENVÍO COTIZACIÓN [ÉXITO] -----\n");
    return true;
  }

  async sendCareerEmail(request: CareerRequest): Promise<boolean> {
    console.log("\n[MOCK EMAIL SERVICE] ----- ENVÍO DE POSTULACIÓN LABORAL (CVs) -----");
    console.log("Nombre Postulante:", request.name);
    console.log("Email:", request.email);
    console.log("Teléfono:", request.phone);
    console.log("Mensaje de Presentación:", request.message);
    console.log("CV Adjunto:", request.cvFile.filename, `(${request.cvFile.mimeType}) - Buffer Size: ${request.cvFile.content.length} bytes`);

    await new Promise((resolve) => setTimeout(resolve, 1200));
    console.log("[MOCK EMAIL SERVICE] ----- FIN ENVÍO POSTULACIÓN [ÉXITO] -----\n");
    return true;
  }

  async sendOrderEmail(request: OrderRequest): Promise<boolean> {
    console.log("\n[MOCK EMAIL SERVICE] ----- ENVÍO DE PEDIDO DE COMPRA DE PRODUCTOS -----");
    console.log("Cliente:", request.name);
    console.log("Email:", request.email);
    console.log("Teléfono:", request.phone);
    console.log("Dirección Entrega:", request.address);
    console.log("Notas Adicionales:", request.notes || "N/A");
    console.log("Detalle de Carrito:");
    request.items.forEach(item => {
      console.log(`  - ${item.quantity}x ${item.title}`);
    });
    console.log("Total estimado (si aplica):", request.total);

    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("[MOCK EMAIL SERVICE] ----- FIN ENVÍO PEDIDO COMPRA [ÉXITO] -----\n");
    return true;
  }
}
