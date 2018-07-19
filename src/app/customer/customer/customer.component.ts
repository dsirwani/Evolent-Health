import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from '../customer';
import { CUSTOMERS } from '../../../../stub/customer';
import { CustomerService } from '../../services/customer.service';
import { Observable } from '../../../../node_modules/rxjs';
import { AddCustomerComponent } from '../add-customer/add-customer.component';

@Component({
  selector: 'evo-hlth-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  customers: Customer[];
  updateCustData: Customer;
  addNewCustomer: boolean;

  @ViewChild(AddCustomerComponent)
    private addCustomer: AddCustomerComponent;
  constructor( private customerService: CustomerService ) { 
    this.getCustomers();
  }

  ngOnInit() {
    this.customerService.customerListStream.subscribe(customers => this.customers = customers);
  }

   getCustomers(): void {
    this.customerService.getCustomers()
        .subscribe( customers => this.customers = customers );
     // this.customerService.getCustomers();
   }

   updateCustomerData(id): void{
      this.customerService.getCustomerToUpdate( id )
                        .subscribe(cust => {
                            this.updateCustData = cust[0];
                            this.addCustomer.updateCustomer( cust[0]);
                        });
      console.log(this.updateCustData);
   }

   deleteCustomer(id): void{
      this.customerService.deleteCustomer( id )
              .subscribe(cust => {
                this.customers = cust;
            });
   }

   showAddCustComponent() {
    this.addNewCustomer = true;
   }


}
