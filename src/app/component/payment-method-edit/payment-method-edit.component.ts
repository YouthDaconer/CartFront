import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { EnableService } from 'src/app/service/enable.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-payment-method-edit',
  templateUrl: './payment-method-edit.component.html',
  styleUrls: ['./payment-method-edit.component.css']
})
export class PaymentMethodEditComponent implements OnInit {

  public paymentMethod: PaymentMethod = null;
  public cargando = false;

  formGroup: FormGroup;
  titleAlert: string = '';
  post: any = '';

  constructor(public paymentMethodService: PaymentMethodService,
    public enableService: EnableService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  async ngOnInit() {
    let roleLoggedIn = localStorage.getItem("role");
    if (roleLoggedIn != "0") {
      this.router.navigate(["/no-autorizado"]);
    } else {
      await this.createForm();
      await this.getPaymentMethod();
    }
  }

  public async getPaymentMethod() {
    const id = this.activatedRoute.snapshot.paramMap.get("payId");
    this.paymentMethodService.findById(id).subscribe(data => {
      this.paymentMethod = data;
    }, error => {
      console.error(error);
    });
  }

  public update(): void {
    let flag: boolean = false;
    if (this.formGroup.status === "VALID") {
      this.cargando = true;
      this.paymentMethod.enable = 'Y';
      this.paymentMethodService.update(this.paymentMethod).subscribe(ok => {
        this.snackBar.open("Método de pago actualizado", "", {
          duration: 1500,
          horizontalPosition: "center",
          verticalPosition: "top",
        });
        this.cargando = false;
        this.router.navigate(['/payment-method-list']);
      }, err => {
        console.log(err);
      });
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'name': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      'validate': ''
    });
  }

  onSubmit(post) {
    this.post = post;
  }

  getErrorName() {
    return this.formGroup.get('name').hasError('required') ? 'El nombre es requerido' :
      this.formGroup.get('name').hasError('minlength') ? 'Mínimo 4 caracteres' :
        this.formGroup.get('name').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

}
