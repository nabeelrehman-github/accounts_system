import { PrefetchResponse, ProductDetails } from "./prefetch-response";
import { BaseResponse } from "./response/base-response";

export class AddCompaniesResponse extends BaseResponse{
    data: InBetweenParam;
}

export class InBetweenParam{
    companiesDetails: ProductDetails.Companies[]  = []
}
