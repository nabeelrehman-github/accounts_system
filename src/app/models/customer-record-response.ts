import { BaseResponse } from "./response/base-response";

export class CustomerRecordResponse extends BaseResponse{
    data: InBetweenCustomerObject;
}

export class InBetweenCustomerObject{
    customer: CustomerRecordData[];
}

export class CustomerRecordData{
    customerName: string;
    phoneNumber: string;
    customerType: number;
    amountDue: number;
}