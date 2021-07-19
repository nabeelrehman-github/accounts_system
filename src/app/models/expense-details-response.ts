import { BaseResponse } from "./response/base-response";

export class ExpenseDetailsResponse extends BaseResponse{
    data: InBetweenParam
}

export class InBetweenParam{
    expenseDetails: ExpenseDetailsData[] = []
}

export class ExpenseDetailsData{
    amount: number;
    branchName: string;
    createdAt: string;
    expenseDetails: string;
}