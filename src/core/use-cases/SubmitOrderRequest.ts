import { IEmailService } from "@/core/domain/models/Contact";
import { OrderRequest } from "@/core/domain/models/Order";

export class SubmitOrderRequestUseCase {
  constructor(private readonly emailService: IEmailService) {}

  async execute(request: OrderRequest): Promise<{ success: boolean; message: string }> {
    // 1. Validaciones básicas de Dominio
    if (!request.name || !request.email || !request.phone || !request.address) {
      return { success: false, message: "Nombre, email, teléfono y dirección de entrega son campos obligatorios." };
    }

    if (!request.items || request.items.length === 0) {
      return { success: false, message: "El carrito de compras está vacío." };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(request.email)) {
      return { success: false, message: "El formato del correo ingresado es inválido." };
    }

    // 2. Ejecutar servicio de infraestructura
    try {
      const isSent = await this.emailService.sendOrderEmail(request);
      
      if (isSent) {
        return { 
          success: true, 
          message: "Consulta de pedido enviada correctamente. Ventas se contactará para coordinar la entrega y el pago." 
        };
      } else {
        return { 
          success: false, 
          message: "No se pudo procesar el pedido. Por favor, realiza la consulta vía WhatsApp." 
        };
      }
    } catch (error) {
      console.error("[SubmitOrderUseCase Error]:", error);
      return { success: false, message: "Ocurrió un error inesperado al procesar tu pedido." };
    }
  }
}
