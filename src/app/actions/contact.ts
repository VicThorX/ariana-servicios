"use server";

// En Next.js 14/15 las Server Actions operan nativamente de lado del servidor (Ocultando llaves API).

import { ContactRequest } from "@/core/domain/models/Contact";
import { ResendEmailService } from "@/core/infrastructure/services/ResendEmailService";
import { MockEmailService } from "@/core/infrastructure/services/MockEmailService";
import { SubmitContactRequestUseCase } from "@/core/use-cases/SubmitContactRequest";

// Inversión de Dependencias (DI) - Factory
function getContactUseCase() {
  // Usa el servicio real si existe la API Key, o el Mock en desarrollo local
  const emailService = process.env.RESEND_API_KEY
    ? new ResendEmailService()
    : new MockEmailService();
  return new SubmitContactRequestUseCase(emailService);
}

export async function submitContactForm(request: ContactRequest) {
  // Instanciamos el cerebro y le pasamos los datos del cliente
  const useCase = getContactUseCase();
  const response = await useCase.execute(request);
  
  return response;
}
