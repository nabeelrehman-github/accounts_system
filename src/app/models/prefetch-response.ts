export class PrefetchResponse {
    products: ProductDetails.Products[];
    customers: Customers[];
    paymentType: PaymentType[];

}

export namespace ProductDetails {
    export class Products {
        constructor(companies?: Companies[]){this.companies = companies}
        companies: Companies[]
    }

    export class Companies {
        constructor(id?: number, companyName?: string, models?: Models[]){
            this.id = id;
            this.companyName = companyName;
            this.models = models;
        }
        id: number;
        companyName: string;
        models: Models[]
    }

    export class Models {
        constructor(id?: number, productId?: string){
            this.id = id;
            this.productId = productId;
        }
        id: number;
        productId: string;
    }
}

export class Customers{
    constructor(id?: number, customerName?: string, phNumber?: string, customerType?: number){
        this.id = id;
        this.customerName = customerName;
        this.phNumber = phNumber;
        this.customerType = customerType;
    }

    id: number;
    customerName: string;
    phNumber: string;
    customerType: number;
}

export class PaymentType{
    constructor(id?: number, name?: string){
        this.id = id;
        this.name = name;
    }
    id: number;
    name: string;
}