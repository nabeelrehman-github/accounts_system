import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataAccessService } from '../services/data_access/data-access.service';
import { AddUpdateEntry } from '../models/add-update-entry';
import { StockDetails } from '../models/stock-details';
declare var $: any;

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  selectedCompany!: number;
  stockDetailList: StockDetails[] = [
    new StockDetails(1, 'LX-100',1, 15000, 13000, 10, '11/07/2021', 'Bilal Trader'),
    new StockDetails(2, 'LX-100',1, 15000, 13000, 10, '11/07/2021', 'Bilal Trader'),
    new StockDetails(3, 'LX-100',1, 15000, 13000, 10, '11/07/2021', 'Bilal Trader'),
    new StockDetails(4, 'LX-100',1, 15000, 13000, 10, '11/07/2021', 'Bilal Trader'),
    new StockDetails(5, 'LX-100',1, 15000, 13000, 10, '11/07/2021', 'Bilal Trader')
  ];

  companies = [
    { id: 1, name: 'Osaka' },
    { id: 2, name: 'Exide' },
    { id: 3, name: 'Power' },
    { id: 4, name: 'Audi' },
    { id: 5, name: 'AGS' }
  ];

  constructor(private dataAccessService: DataAccessService, private router: Router) { }
 
  ngOnInit(): void {
  }

  updateEntry(entryId: number){
    let selectedItem: StockDetails = this.stockDetailList.find(i => i.entryId == entryId); // Getting Selectd Object.
    
    let entry: AddUpdateEntry = { 
      isUpdate: true,
      entryId: entryId,
      companyName: this.companies.find(i=>i.id == this.selectedCompany).name, // Getting company name base on id.
      modelName: selectedItem.modelName,
      purchasePrice: selectedItem.purchasePrice,
      salesPrice: selectedItem.salesPrice,
      alreadyInStock: selectedItem.inStockQuantity,
      venderName: selectedItem.vendorName };

    this.dataAccessService.setAddUpdateItem(entry); // Update Subject.
    this.router.navigate(['add_stock_item']);
  }
}
