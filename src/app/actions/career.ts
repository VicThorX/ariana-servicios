"use server";

import { CareerRequest } from "@/core/domain/models/Career";
import { ResendEmailService } from "@/core/infrastructure/services/ResendEmailService";
import { MockEmailService } from "@/core/infrastructure/services/MockEmailService";
import { SubmitCareerRequestUseCase } from "@/core/use-cases/SubmitCareerRequest";

function getCareerUseCase() {
  const emailService = process.env.RESEND_API_KEY
    ? new ResendEmailService()
    : new MockEmailService();
  return new SubmitCareerRequestUseCase(emailService);
}

export async function submitCareerForm(formData: FormData) {
  try {
    const name = (formData.get("name") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();
    const cvFile = formData.get("cv") as File;

    if (!cvFile || cvFile.size === 0) {
      return { success: false, message: "El archivo de tu currículum (CV) es obligatorio." };
    }

    const buffer = Buffer.from(await cvFile.arrayBuffer());

    const request: CareerRequest = {
      name,
      email,
      phone,
      message,
      cvFile: {
        filename: cvFile.name,
        mimeType: cvFile.type,
        content: buffer,
      },
    };

    const useCase = getCareerUseCase();
    const response = await useCase.execute(request);
    
    return response;
  } catch (error) {
    console.error("[submitCareerForm Server Action Error]:", error);
    return { success: false, message: "Error al procesar tu postulación en el servidor." };
  }
}
