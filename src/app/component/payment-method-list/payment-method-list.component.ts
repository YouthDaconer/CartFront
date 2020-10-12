import { Component, OnInit } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {

  public titulo:string='Lista de Clientes';
  public paymentMethods:PaymentMethod[];

  constructor(public paymentMethodService:PaymentMethodService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void{
    this.paymentMethodService.findAll().subscribe(data=>{
        this.paymentMethods=data;
    },error=>{
        console.error(error);
    });
  }

}
