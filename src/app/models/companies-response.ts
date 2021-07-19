export class CompanesResponse{
    data: InBetweenParam[] = [];
}

export class InBetweenParam{
    companiesDetails:CompaniesData
}

export class CompaniesData{
    id: number;
    companyName: string;
    visible: boolean;
}