import { BaseResponse } from "./response/base-response";

export class InvoiceSummariesResponse extends BaseResponse{
    data: InvoiceSummariesParam
}

class InvoiceSummariesParam{
    invoiceSummaries: InvoiceSummariesData[]
}

export class InvoiceSummariesData{
    id: number;
    customerName: string;
    paymentType: string;
    totalAmount: number;
    miscAmount: number;
    miscDetails: string;
    branchName: string;
    status: string;
    createdAt: string;
    updatedAt: string;
}