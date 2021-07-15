export class StockDetails {
    constructor(eid:number, mn:string, mid:number, sp:number, pp:number, q:number, se: string, v: string){
        this.entryId = eid;
        this.modelName = mn;
        this.modelId = mid;
        this.salesPrice = sp;
        this.purchasePrice = pp;
        this.inStockQuantity = q;
        this.lastStockEntry = se;
        this.vendorName = v;
    }
    entryId!: number;
    modelName!: string;
    modelId!: number;
    salesPrice!: number;
    purchasePrice!: number;
    inStockQuantity!: number;
    lastStockEntry!: string;
    vendorName!: string;
}