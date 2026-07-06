"use server";

import { OrderRequest, OrderItem } from "@/core/domain/models/Order";
import { ResendEmailService } from "@/core/infrastructure/services/ResendEmailService";
import { MockEmailService } from "@/core/infrastructure/services/MockEmailService";
import { SubmitOrderRequestUseCase } from "@/core/use-cases/SubmitOrderRequest";

function getOrderUseCase() {
  const emailService = process.env.RESEND_API_KEY
    ? new ResendEmailService()
    : new MockEmailService();
  return new SubmitOrderRequestUseCase(emailService);
}

export async function submitOrderForm(formData: FormData) {
  try {
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const address = (formData.get("address") as string || "").trim();
    const notes = (formData.get("notes") as string || "").trim();
    const itemsJson = formData.get("items") as string;

    if (!itemsJson) {
      return { success: false, message: "El detalle del pedido no fue recibido." };
    }

    let items: OrderItem[] = [];
    try {
      items = JSON.parse(itemsJson);
    } catch {
      return { success: false, message: "El formato de los artículos del carrito no es válido." };
    }

    // Calcular total básico (si los productos vienen con precio)
    let total = 0;
    items.forEach(item => {
      total += (item.price || 0) * item.quantity;
    });

    const request: OrderRequest = {
      name,
      email,
      phone,
      address,
      notes: notes || undefined,
      items,
      total,
    };

    const useCase = getOrderUseCase();
    const response = await useCase.execute(request);
    
    return response;
  } catch (error) {
    console.error("[submitOrderForm Server Action Error]:", error);
    return { success: false, message: "Error al procesar tu pedido en el servidor." };
  }
}
