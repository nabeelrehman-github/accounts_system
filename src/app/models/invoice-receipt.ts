export class InvoiceReceipt{
    invoiceNumber: number;
    date: string;
    invoiceItem: InvoiceReceiptItem[] = [];
    miscCharges: number;
    totalBill: number;
}

export class InvoiceReceiptItem{
    quantity: number;
    company: string;
    model: string;
    rate: number;
    total: number;
}