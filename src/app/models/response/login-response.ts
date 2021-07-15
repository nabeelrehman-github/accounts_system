import { BaseResponse } from "./base-response";

export namespace LoginResponse{
    export class LoginBaseResponse extends BaseResponse{
        data: ProfileData;
    }
    export class ProfileData{
        firstName: string;
        lastName: string;
        userRole: string;
        userName: string;
        branchId: number;
        branchName: string;
    }
}

