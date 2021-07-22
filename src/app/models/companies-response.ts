import { BaseResponse } from "./response/base-response";

export class CompaniesResponse extends BaseResponse{
    data: InBetweenParam;
}

export class InBetweenParam{
    companiesDetails:CompaniesData[] = [];
}

export class CompaniesData{
    id: number;
    companyName: string;
    visible: boolean;
}