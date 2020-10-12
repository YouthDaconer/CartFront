import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public titulo:string='Lista de Clientes';
  public customers:Customer[];

  constructor(public customerService:CustomerService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void{
    this.customerService.findAll().subscribe(data=>{
        this.customers=data;
    },error=>{
        console.error(error);
    });
  }

}
