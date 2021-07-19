import { BaseResponse } from "./response/base-response";

export class InventoryDetailsResponse extends BaseResponse{
    data: InBetweenParam;
}

export class InBetweenParam{
    inventoryDetails: InventoryDetailsData[] = [];
}

export class InventoryDetailsData{
    productId: string;
    quantity: number;
    sold: number;
    available: number;
    defetive: number;
    createdAt: string;
    branchName: string;
}