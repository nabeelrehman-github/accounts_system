import { BaseResponse } from "./response/base-response";

export class InvoiceSummaryDetailsResponse extends BaseResponse{
    data: InBetweenObject;
}

export class InBetweenObject{
    invoiceDetails: InvoiceSummaryDetailsData[]
}

export class InvoiceSummaryDetailsData{
    id: number;
    companyName: string;
    productId: string;
    quantity: number;
    price: number;
}