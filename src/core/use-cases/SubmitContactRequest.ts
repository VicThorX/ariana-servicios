import { ContactRequest, IEmailService } from "@/core/domain/models/Contact";

export class SubmitContactRequestUseCase {
  constructor(private readonly emailService: IEmailService) {}

  async execute(request: ContactRequest): Promise<{ success: boolean; message: string }> {
    // 1. Basic Domain Validation (Business Rules)
    if (!request.name || !request.email || !request.message) {
      return { success: false, message: "Nombre, email y mensaje son campos obligatorios." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.email)) {
        return { success: false, message: "El formato del correo ingresado es inválido." };
    }

    // 2. Execute Infrastructure Layer
    try {
      const isSent = await this.emailService.sendContactEmail(request);
      
      if (isSent) {
        return { 
            success: true, 
            message: "Presupuesto solicitado con éxito. Un supervisor se contactará a la brevedad." 
        };
      } else {
        return { 
            success: false, 
            message: "Mantenimiento temporal. Por favor, comuníquese telefónicamente al 223-5220338." 
        };
      }
    } catch (error) {
      console.error("[SubmitContactUseCase Error]:", error);
      return { success: false, message: "Ocurrió un error inesperado al orquestar los servicios externos." };
    }
  }
}
