import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-update-companies',
  templateUrl: './add-update-companies.component.html',
  styleUrls: ['./add-update-companies.component.css']
})
export class AddUpdateCompaniesComponent implements OnInit {
  companyName!: string;
  updateCompanyId!: number;

  isUpdate: boolean = false;

  companies = [
    { id: 1, name: 'Osaka' },
    { id: 2, name: 'Exide' },
    { id: 3, name: 'Power' },
    { id: 4, name: 'Audi' },
    { id: 5, name: 'AGS' }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  getRow(id, name){
    this.isUpdate = true;
    this.updateCompanyId = id;
    this.companyName = name;
  }
  clear(){
    this.companyName = '';
    this.isUpdate = false;
  }
}
