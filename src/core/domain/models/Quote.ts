export interface QuoteRequest {
  name: string;
  role: string; // e.g., propietario, administrador/gerente, suplente, etc.
  email: string;
  phone: string;
  establishmentType: string; // e.g., consorcio, oficina, local, etc.
  
  // Condicionales para Consorcios
  adminName?: string;
  adminAddress?: string;
  adminContact?: string;

  // Detalles del servicio
  address: string;
  frequencyHoursDays: string;
  preferredSchedule: string;
  hasCurrentService: string; // e.g. "si" o "no"
  estimatedStartDate: string;
  message: string;
  
  // Archivos adjuntos (fotos)
  photos?: {
    filename: string;
    mimeType: string;
    content: Buffer;
  }[];
}
