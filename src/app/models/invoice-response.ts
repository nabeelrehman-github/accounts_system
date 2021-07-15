import { BaseResponse } from "./response/base-response";

export namespace InvoiceResponse{
    export class SellerInvoiceResponse extends BaseResponse{
        data: InvoiceResponseData
    }

    class InvoiceResponseData{
        invoiceNumber: number;
        invoiceStatus: string;
    }
}