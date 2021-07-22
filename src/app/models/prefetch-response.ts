import { BaseResponse } from "./response/base-response";

export class PrefetchResponse extends BaseResponse{
    data: PrefetchResponseData = new PrefetchResponseData();
}

export class PrefetchResponseData {
    products: ProductDetails.Companies[];
    customers: Customers[];
    paymentTypes: PaymentType[];
    adjustmentTypes: AdjustmentTypes[];
}

export namespace ProductDetails {
    // export class Products {
    //     constructor(companies?: Companies[]){this.companies = companies}
    //     companies: 
    // }

    export class Companies {
        id: number;
        companyName: string;
        models: Models[]
    }

    export class Models {
        id: number;
        value: string;
        minSalePrice: number;
        maxSalePrice: number;
    }
}

export class Customers{
    id!: number;
    customerName!: string;
    phoneNumber!: string;
    customerType!: number;
}

export class PaymentType{
    id: number;
    value: string;
}

export class AdjustmentTypes{
    id: number;
    value: string;
}