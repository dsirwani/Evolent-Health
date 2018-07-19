import { Injectable } from '@angular/core';
import { Customer } from '../customer/customer';
import { CUSTOMERS } from '../../../stub/customer';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  id = 1;
  private customerSource = new Subject<Customer[]>();
  customerListStream = this.customerSource.asObservable();
  customerList: Customer[];
  constructor() {
      this.evaluateId(CUSTOMERS);
   }

  evaluateId(customer: Customer[] ): void {
    const customersData = customer.map( cust => {
        return ( {...cust, customerId: this.id++ } );
    });
    this.customerList = customersData;
  }

  getCustomers(): Observable<Customer[]> {
    return of( CUSTOMERS );
  }

  addCustomer( customer: Customer): void {
    this.customerList.push({...customer, customerId: this.id++ });
    console.log( this.customerList );
    this.customerSource.next( this.customerList );
  }

  getCustomerToUpdate(id): Observable<Customer[]> {
    let customer: Customer[] = this.customerList.filter(cust =>  cust.customerId === id  );
    return of (customer);
 }

 deleteCustomer(id): Observable<Customer[]>{
  let customers: Customer[] = this.customerList.filter(cust =>  cust.customerId !== id  );
  this.customerList = customers;
  return of (this.customerList);
 }

 updateCustomerData(customer: Customer, idToUpdate: Number ): void{
    let customers: Customer[] = [];
    this.customerList.forEach(cust => {
      if(cust.customerId === idToUpdate) {
        customers.push(customer);
      } else {
        customers.push(cust);
      }
    });
    this.customerList = customers;
    this.customerSource.next( this.customerList );
 }


  fetchCustomerList(customerList: Customer[]) {
    this.customerSource.next( customerList );
  }
}
