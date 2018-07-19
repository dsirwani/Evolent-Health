import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'evo-hlth-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {
  emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  customerData: FormGroup;
  @Input() customers: Customer[];
  nextId: Number ;
  updateCustomerFlag: boolean;
 
  constructor(private fb: FormBuilder,  private customerService: CustomerService) {
    this.customerData = this.fb.group({
      firstName: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [ Validators.required, Validators.minLength(2),
        Validators.maxLength(20), Validators.pattern('^[a-zA-Z]+$')]],
      phoneNumber: ['', [ Validators.required, Validators.maxLength(15),
        Validators.pattern('^[0-9]{10}$')]],
      email: ['', [ Validators.required, Validators.pattern(this.emailPattern)]],
      status: ['']
    });
   this.updateCustomerFlag = false;
  }

  ngOnInit() {
    this.customerService.customerListStream.subscribe( customerList => {
      this.customers = customerList;
      this.nextId = this.customers.length + 1;
    });
    this.nextId = this.customers.length + 1;
  }

  addCustomer() {
    if(!this.updateCustomerFlag){
      this.customerService.addCustomer( this.customerData.value );
    }
    if(this.updateCustomerFlag){
      this.customerService.updateCustomerData({...this.customerData.value, customerId: this.nextId}, this.nextId);
    }
    this.updateCustomerFlag = !this.updateCustomerFlag;
    this.customerData.reset();
  }

  updateCustomer(customer){
    this.customerData.setValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phoneNumber: customer.phoneNumber,
      status: customer.status
    });
    this.nextId = customer.customerId;
    this.updateCustomerFlag = true;
  }
}
