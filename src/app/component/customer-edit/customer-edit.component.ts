import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  // Id del customer
  public email: string;
  public customer: Customer;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[];

  constructor(public router: Router,
    public activatedRouter: ActivatedRoute,
    public customerService: CustomerService,
    public enableService: EnableService) { }

  ngOnInit(): void {
    let params = this.activatedRouter.params['_value'];
    this.email = params.email;
    this.findById();
    this.findAllEnable();
    console.log(this.email);
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public findById(): void {
    this.customerService.findById(this.email).subscribe(data => {
      this.customer = data;
      console.table(this.customer);
    })
  }

  public update(): void {
    this.messages = [""];
    this.customerService.update(this.customer).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El customer se modificó con éxito";
    }, error => {
      console.error(error);
      this.showMsg = true;
      this.messages = error.error.error;
    })
  }

  public delete(): void {
    this.messages = [""];
    this.customerService.delete(this.customer.email).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El customer se borró con éxito";
    }, error => {
      console.error(error);
      this.showMsg = true;
      this.messages = error.error.error;
    })
  }

}
