"use server";

import { QuoteRequest } from "@/core/domain/models/Quote";
import { ResendEmailService } from "@/core/infrastructure/services/ResendEmailService";
import { MockEmailService } from "@/core/infrastructure/services/MockEmailService";
import { SubmitQuoteRequestUseCase } from "@/core/use-cases/SubmitQuoteRequest";

function getQuoteUseCase() {
  const emailService = process.env.RESEND_API_KEY
    ? new ResendEmailService()
    : new MockEmailService();
  return new SubmitQuoteRequestUseCase(emailService);
}

export async function submitQuoteForm(formData: FormData) {
  try {
    const name = (formData.get("name") as string || "").trim();
    const role = (formData.get("role") as string || "").trim();
    const email = (formData.get("email") as string || "").trim();
    const phone = (formData.get("phone") as string || "").trim();
    const establishmentType = (formData.get("establishmentType") as string || "").trim();
    
    // Condicionales para consorcios
    const adminName = (formData.get("adminName") as string || "").trim();
    const adminAddress = (formData.get("adminAddress") as string || "").trim();
    const adminContact = (formData.get("adminContact") as string || "").trim();

    // Detalles
    const address = (formData.get("address") as string || "").trim();
    const frequencyHoursDays = (formData.get("frequencyHoursDays") as string || "").trim();
    const preferredSchedule = (formData.get("preferredSchedule") as string || "").trim();
    const hasCurrentService = (formData.get("hasCurrentService") as string || "").trim();
    const estimatedStartDate = (formData.get("estimatedStartDate") as string || "").trim();
    const message = (formData.get("message") as string || "").trim();

    // Carga de imágenes
    const photoFiles = formData.getAll("photos") as File[];
    const photos: { filename: string; mimeType: string; content: Buffer }[] = [];

    for (const file of photoFiles) {
      // Ignorar archivos vacíos
      if (file && file.size > 0 && file.name) {
        const buffer = Buffer.from(await file.arrayBuffer());
        photos.push({
          filename: file.name,
          mimeType: file.type,
          content: buffer,
        });
      }
    }

    const request: QuoteRequest = {
      name,
      role,
      email,
      phone,
      establishmentType,
      address,
      frequencyHoursDays,
      preferredSchedule,
      hasCurrentService,
      estimatedStartDate,
      message,
      photos: photos.length > 0 ? photos : undefined,
    };

    if (establishmentType.toLowerCase() === "consorcio") {
      request.adminName = adminName;
      request.adminAddress = adminAddress;
      request.adminContact = adminContact;
    }

    const useCase = getQuoteUseCase();
    const response = await useCase.execute(request);
    
    return response;
  } catch (error) {
    console.error("[submitQuoteForm Server Action Error]:", error);
    return { success: false, message: "Error al procesar el formulario de cotización en el servidor." };
  }
}
