import { Component, OnInit } from '@angular/core';
import { AddCompanyRequest } from '../models/add-company-request';
import { CompaniesData } from '../models/companies-response';
import { StatusCode } from '../models/status-codes';
import { DataAccessService } from '../services/data_access/data-access.service';
import { UtilityService } from '../services/utility.service';

@Component({
  selector: 'app-add-update-companies',
  templateUrl: './add-update-companies.component.html',
  styleUrls: ['./add-update-companies.component.css']
})
export class AddUpdateCompaniesComponent implements OnInit {
  addCompanyRequest: AddCompanyRequest = new AddCompanyRequest();
  companyName!: string;
  updateCompanyId!: number;

  isUpdate: boolean = false;

  companies: CompaniesData[] = []
  constructor(private dataAccessService: DataAccessService, private utilityService: UtilityService) {
    this.companies = this.utilityService.getCompanies();
  }

  ngOnInit(): void {
  }

  addCompany() {
    if (this.companyName != null && this.companyName != '') {
      this.addCompanyRequest.companyName = this.companyName;
      this.dataAccessService.callAddCompanies(this.addCompanyRequest).subscribe(
        res => {
          if (res.statusCode == StatusCode.SUCCESS_CODE) {
            this.companies = res.data.companiesDetails;
            this.utilityService.setCompanies(res.data.companiesDetails);
          }
        }
      );
    }
  }

  getRow(id, name) {
    this.isUpdate = true;
    this.updateCompanyId = id;
    this.companyName = name;
  }
  clear() {
    this.companyName = null;
    this.isUpdate = false;
  }
}
