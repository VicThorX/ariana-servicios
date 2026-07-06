import { IEmailService } from "@/core/domain/models/Contact";
import { CareerRequest } from "@/core/domain/models/Career";

export class SubmitCareerRequestUseCase {
  constructor(private readonly emailService: IEmailService) {}

  async execute(request: CareerRequest): Promise<{ success: boolean; message: string }> {
    // 1. Validaciones básicas de Dominio
    if (!request.name || !request.email || !request.phone || !request.cvFile) {
      return { success: false, message: "Nombre, email, teléfono y el archivo de tu currículum (CV) son obligatorios." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.email)) {
      return { success: false, message: "El formato del correo ingresado es inválido." };
    }

    // 2. Ejecutar servicio de infraestructura
    try {
      const isSent = await this.emailService.sendCareerEmail(request);
      
      if (isSent) {
        return { 
          success: true, 
          message: "Postulación recibida correctamente. Evaluaremos tu perfil y te contactaremos en caso de avanzar." 
        };
      } else {
        return { 
          success: false, 
          message: "Servicio de recepción no disponible temporalmente. Inténtalo más tarde." 
        };
      }
    } catch (error) {
      console.error("[SubmitCareerUseCase Error]:", error);
      return { success: false, message: "Ocurrió un error inesperado al procesar tu postulación." };
    }
  }
}
