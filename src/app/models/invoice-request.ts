export class SaveInvoiceRequest {
    amount!: number;
    customerId!: number;
    misc_amount!: number;
    misc_desc!: string;
    paymentType!: number;
    invoiceDetails!: InvoiceItemRequest[];
}

export class InvoiceItemRequest {
    companyId!: number;
    productId!: string;
    quantity!: number;
    price!: number;
}