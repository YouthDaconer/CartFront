import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { Enable } from 'src/app/domain/enable';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { EnableService } from 'src/app/service/enable.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment-method-save',
  templateUrl: './payment-method-save.component.html',
  styleUrls: ['./payment-method-save.component.css']
})
export class PaymentMethodSaveComponent implements OnInit {

  public paymentMethod: PaymentMethod;
  public enables: Enable[];
  public cargando = false;

  formGroup: FormGroup;
  titleAlert: string = '';
  post: any = '';

  constructor(public paymentMethodService: PaymentMethodService,
    public enableService: EnableService,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    let roleLoggedIn = localStorage.getItem("role");
    if (roleLoggedIn != "0") {
      this.router.navigate(["/no-autorizado"]);
    } else {
      this.paymentMethod = new PaymentMethod("", "Y");
      this.findAllEnable();
      this.createForm();
    }
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public save(): void {
    if (this.formGroup.status === "VALID") {
      this.cargando = true;
      this.paymentMethod.enable = 'Y';
      this.paymentMethodService.save(this.paymentMethod).subscribe(ok => {
        this.snackBar.open("Método de pago guardado", "", {
          duration: 1500,
          horizontalPosition: "start",
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
