import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { Enable } from 'src/app/domain/enable';
import { CustomerService } from 'src/app/service/customer.service';
import { EnableService } from 'src/app/service/enable.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthCartService } from 'src/app/service/auth-cart.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  public customer: Customer = null;
  public flag: boolean = false;
  public cargando = false;
  public jsonUserLoggedIn = JSON.parse(localStorage.getItem("user"));
  public isComplete: boolean = false;
  public passwordChanged: boolean = false;

  formGroup: FormGroup;
  titleAlert: string = '';
  post: any = '';

  constructor(public customerService: CustomerService,
    public enableService: EnableService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public authCartService: AuthCartService,
    private router: Router) { }

  async ngOnInit() {
    this.getCustomer();
  }

  public async getCustomer() {
    const id = this.activatedRoute.snapshot.paramMap.get("email");
    this.customerService.findById(id).subscribe(data => {
      this.customer = data;
      this.createForm();
    }, error => {
      console.error(error);
    });
  }

  public update(post: any) {
    if (this.formGroup.status === "VALID") {
      this.cargando = true;
      this.customer.enable = 'Y';
      this.customerService.update(this.customer).subscribe(ok => {
        console.log(ok);
      }, err => {
        console.log(err);
      });
      this.isComplete = true;
      this.updating(post).then(() => {
        if (this.isComplete) {
          this.isComplete = false;
          this.cargando = false;
          this.passwordChanged = false;
          this.openSnackBar("Cliente actualizado", "Ok");
          this.router.navigateByUrl("/customer-list");
        } else {
          this.cargando = false;
        }
      });
    }
  }

  public async updating(post: any) {
    if (this.jsonUserLoggedIn.uid === this.customer.token) {
      if (post.password != null && post.password != '') {
        if (post.passwordNew == null || post.passwordNew == '') {
          this.isComplete = false;
          this.openSnackBar("Si desea cambiar su contraseña debe especificar una nueva", "Ok");
        } else {
          await this.authCartService.updatePassword(this.jsonUserLoggedIn.email, post.password, post.passwordNew).catch(e => {
            switch (e.code) {
              case 'auth/wrong-password':
                this.isComplete = false;
                this.openSnackBar("Contraseña actual incorrecta", "Ok");
                break;
              default:
                this.isComplete = false;
                console.error(e);
                this.openSnackBar("Estado desconocido", "Ok");
                break;
            }
          });
        }
      }
    }
  }

  createForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (this.jsonUserLoggedIn.uid === this.customer.token) {
      this.formGroup = this.formBuilder.group({
        'passwordNew': [null, [Validators.minLength(6), this.checkPassword]],
        'password': [null, []],
        'name': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
        'address': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        'phone': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
        'validate': ''
      });
    } else {
      this.formGroup = this.formBuilder.group({
        'name': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
        'address': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
        'phone': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
        'validate': ''
      });
    }
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    return this.formGroup.get('passwordNew').hasError('required') ? 'Ingresa la contraseña' :
      this.formGroup.get('passwordNew').hasError('minlength') ? 'Mínimo 6 caracteres' :
        this.formGroup.get('passwordNew').hasError('requirements') ? 'La contraseña debe tener como mínimo 6 caracteres, una letra mayuscula y un número' : '';
  }

  getErrorEmail() {
    return this.formGroup.get('email').hasError('required') ? 'Ingresa el email' :
      this.formGroup.get('email').hasError('pattern') ? 'Ingresa un email válido' : '';
  }

  getErrorName() {
    return this.formGroup.get('name').hasError('required') ? 'El nombre es requerido' :
      this.formGroup.get('name').hasError('minlength') ? 'Mínimo 4 caracteres' :
        this.formGroup.get('name').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorAddress() {
    return this.formGroup.get('address').hasError('required') ? 'La dirección es requerida' :
      this.formGroup.get('address').hasError('minlength') ? 'Mínimo 3 caracteres' :
        this.formGroup.get('address').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorPhone() {
    return this.formGroup.get('phone').hasError('required') ? 'El teléfono es requerido' :
      this.formGroup.get('phone').hasError('minlength') ? 'Mínimo 10 caracteres' :
        this.formGroup.get('phone').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}
