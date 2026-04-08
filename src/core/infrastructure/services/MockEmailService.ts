import { ContactRequest, IEmailService } from "@/core/domain/models/Contact";

export class MockEmailService implements IEmailService {
  async sendContactEmail(request: ContactRequest): Promise<boolean> {
    console.log("\n[SERVER LOG] ----- INICIO DE ENVÍO DE EMAIL [MOCK] -----");
    console.log("De:", request.name, `(${request.email})`);
    console.log("Teléfono de Contacto:", request.phone);
    console.log("Dirección Consorcio:", request.address || "N/A");
    console.log("Cuerpo del Mensaje:", request.message);
    
    // Simulate realistic network delay (telemetry)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("[SERVER LOG] ----- FIN DE ENVÍO DE EMAIL [ÉXITO SIMULADO] -----\n");
    return true; // Return successful transmission
  }
}
