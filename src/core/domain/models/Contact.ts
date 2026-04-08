export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  address?: string;
  message: string;
}

export interface IEmailService {
  sendContactEmail(request: ContactRequest): Promise<boolean>;
}
