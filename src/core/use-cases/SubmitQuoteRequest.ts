import { IEmailService } from "@/core/domain/models/Contact";
import { QuoteRequest } from "@/core/domain/models/Quote";

export class SubmitQuoteRequestUseCase {
  constructor(private readonly emailService: IEmailService) {}

  async execute(request: QuoteRequest): Promise<{ success: boolean; message: string }> {
    // 1. Validaciones básicas de Dominio
    if (!request.name || !request.email || !request.establishmentType || !request.address) {
      return { success: false, message: "Nombre, email, tipo de establecimiento y dirección son campos obligatorios." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.email)) {
      return { success: false, message: "El formato del correo ingresado es inválido." };
    }

    // Validación condicional de consorcios
    if (request.establishmentType.toLowerCase() === "consorcio") {
      if (!request.adminName || !request.adminAddress || !request.adminContact) {
        return { 
          success: false, 
          message: "Para consorcios, los datos de la administración (nombre, dirección y contacto) son obligatorios." 
        };
      }
    }

    // 2. Ejecutar servicio de infraestructura (envío de email)
    try {
      const isSent = await this.emailService.sendQuoteEmail(request);
      
      if (isSent) {
        return { 
          success: true, 
          message: "Presupuesto solicitado con éxito. Un supervisor se contactará a la brevedad." 
        };
      } else {
        return { 
          success: false, 
          message: "Error de comunicación temporal. Por favor, comuníquese directamente al 223-5220338." 
        };
      }
    } catch (error) {
      console.error("[SubmitQuoteUseCase Error]:", error);
      return { success: false, message: "Ocurrió un error inesperado al gestionar el envío de la cotización." };
    }
  }
}
