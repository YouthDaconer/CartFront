import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';

@Component({
  selector: 'app-customer-save',
  templateUrl: './customer-save.component.html',
  styleUrls: ['./customer-save.component.css']
})
export class CustomerSaveComponent implements OnInit {

  public customer: Customer;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];

  constructor(public customerService: CustomerService,
    public enableService: EnableService) { }

  ngOnInit(): void {
    this.customer = new Customer("", "", "Y", "", "", "", 0);
    this.findAllEnable();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public save(): void {
    this.messages = [""];
    this.customerService.save(this.customer).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El customer se grabó con éxito";
    }, err => {
      console.log(err);
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

}
