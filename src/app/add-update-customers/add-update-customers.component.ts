import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-update-customers',
  templateUrl: './add-update-customers.component.html',
  styleUrls: ['./add-update-customers.component.css']
})
export class AddUpdateCustomersComponent implements OnInit {

  customerName: string;
  phoneNumber: string;
  selectedCustomerType: string;

  customerType = [
    {id: '1', name: 'Customer'},
    {id: '2', name: 'Supplier'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
