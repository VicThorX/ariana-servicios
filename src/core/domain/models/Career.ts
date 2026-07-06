export interface CareerRequest {
  name: string;
  email: string;
  phone: string;
  message: string;
  
  // Archivo adjunto (CV)
  cvFile: {
    filename: string;
    mimeType: string;
    content: Buffer;
  };
}
