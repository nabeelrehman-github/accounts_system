export class InvoiceReceipt{
    invoiceNumber: number;
    date: string;
    invoiceItem: InvoiceReceiptItem[] = [];
    miscCharges: number;
    totalBill: number;
    discount: number;
    paymentReceived: number;
    balanceReturned: number;
    salesmanName: string;
    branchName: string;
    customerName: string;
}

export class InvoiceReceiptItem{
    quantity: number;
    company: string;
    model: string;
    rate: number;
    total: number;
}