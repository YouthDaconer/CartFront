import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { PaymentMethodService } from 'src/app/service/payment-method.service';

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {

  // Id del paymentMethod
  public proId: string;
  public paymentMethod: PaymentMethod;

  constructor(public router: Router,
    public activatedRouter: ActivatedRoute,
    public paymentMethodService: PaymentMethodService) { }

  ngOnInit(): void {
    let params = this.activatedRouter.params['_value'];
    this.proId = params.proId;
    this.findById();
    console.log(this.proId);
  }

  public findById(): void {
    this.paymentMethodService.findById(this.proId).subscribe(data => {
      this.paymentMethod = data;
      console.table(this.paymentMethod);
    })
  }

}
