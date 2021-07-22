export class SaveSupplierInvoiceRequest {
    amount!: number;
    customerId!: number;
    misc_amount!: number;
    misc_desc!: string;
    paymentType!: number;
    invoiceDetails!: InvoiceItemRequest[];
    phoneNumber: string;
    customerName: string;
    discountAmount: number;
}

export class InvoiceItemRequest {
    companyId!: number;
    productId!: string;
    quantity!: number;
    price!: number;
    minSalePrice!: number;
    maxSalePrice!: number;
}