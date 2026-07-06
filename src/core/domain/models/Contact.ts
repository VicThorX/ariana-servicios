import { QuoteRequest } from "./Quote";
import { CareerRequest } from "./Career";
import { OrderRequest } from "./Order";

export interface ContactRequest {
  name: string;
  phone: string;
  email: string;
  address?: string;
  message: string;
}

export interface IEmailService {
  sendContactEmail(request: ContactRequest): Promise<boolean>;
  sendQuoteEmail(request: QuoteRequest): Promise<boolean>;
  sendCareerEmail(request: CareerRequest): Promise<boolean>;
  sendOrderEmail(request: OrderRequest): Promise<boolean>;
}

