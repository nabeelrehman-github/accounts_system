import { BaseResponse } from "./response/base-response";

export class HeadDetailsResponse extends BaseResponse{
    data: InBetweenParam;
}

export class InBetweenParam{
    headDetails: HeadDetailsData[] = []
}

export class HeadDetailsData{
    headAmount: number;
    headName: string;
    createdAt: string;
}