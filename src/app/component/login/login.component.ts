import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { Customer } from 'src/app/domain/customer';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from 'src/app/service/customer.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { CartService } from 'src/app/service/cart.service';
import { DataSharingService } from "src/app/service/data-sharing.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: User;
  public formGroupLogin: FormGroup;
  public formGroupRegistro: FormGroup;
  public customer: Customer;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  public selectTabIndex: number = 0;
  postLogin: any = '';
  postRegistro: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authCartService: AuthCartService,
    public authService: AuthService,
    private _snackBar: MatSnackBar,
    public customerService: CustomerService,
    public angularFireAuth: AngularFireAuth,
    private cartService: CartService,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit(): void {
    this.customer = new Customer("", "", "", "", "", "", 0);
    this.createFormLogin();
    this.createFormRegistro();
    this.user = new User("admin", "password");
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
    if (this.authService.loggedIn()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  public ingresar(post: any, formDirective: FormGroupDirective): void {
    if (this.formGroupLogin.status === "VALID") {
      this.authCartService.login(post.email, post.password)
        .then(() => {
          // Login de usuario
          this.authService.loginUser(this.user).subscribe(data => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("usuario", JSON.stringify(this.user));
            this.customerService.findById(post.email).subscribe(resp => {
              localStorage.setItem("role", resp.tipo);
              // Comunicación entre componentes
              this.dataSharingService.changeMessage("car_check");
              window.location.reload();
            }, error => {
              console.error(error);
            });
          }, error => {
            console.error(error);
          });
        })
        .catch(e => {
          switch (e.code) {
            case "auth/wrong-password":
              this.openSnackBar("La contraseña del usuario es incorrecta", "Ok");
              break;
            case "auth/user-not-found":
              this.openSnackBar("El usuario no fue encontrado", "Ok");
              break;
            case "auth/too-many-requests":
              this.openSnackBar("El acceso a esta cuenta ha sido temporalmente desactivado debido a muchos intentos fallidos de ingreso. Puedes restaurarlo inmediatamente restableciendo tu contraseña o puedes intentarlo de nuevo más tarde", "Ok");
              break;
            case "auth/user-disabled":
              this.openSnackBar("El usuario está inhabilitado del sistema", "Ok");
              break;
            default:
              this.openSnackBar("Estado desconocido", "Ok");
              break;
          }
        });
    }
  }

  public register(post: any, formDirective: FormGroupDirective): void {
    if (this.formGroupRegistro.status === "VALID") {
      this.postRegistro = post;

      this.authCartService.createUser(this.customer, this.postRegistro.password)
        .then(() => {
          this.angularFireAuth.authState.subscribe(user => {
            this.customer.token = user.uid;
            this.customer.tipo = 1;
            this.customer.enable = 'Y';
            this.authCartService.sendEmailVerification();
            this.customerService.save(this.customer).subscribe(ok => {
              formDirective.resetForm();
              this.formGroupRegistro.reset();
              this.selectTab();
              this.openSnackBar("Usuario creado con éxito", "Ok");
              this.router.navigate(['/login']);
            }, err => {
              console.log(err);
              this.openSnackBar("No se pudieron guardar los datos del cliente", "Ok");
            });
          });
        })
        .catch(e => {
          switch (e.code) {
            case "auth/email-already-in-use":
              this.openSnackBar("El email ingresado ya está en uso", "Ok");
              break;
            default:
              console.error(e);
              this.openSnackBar("Estado desconocido", "Ok");
              break;
          }
        });
    }
  }

  createFormLogin() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroupLogin = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required]],
      'validate': ''
    });
  }

  createFormRegistro() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroupRegistro = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'password': [null, [Validators.required, Validators.minLength(6), this.checkPassword]],
      'name': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      'address': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      'phone': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      'validate': ''
    });
  }

  checkPassword(control) {
    let enteredPassword = control.value
    let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorEmailLogin() {
    return this.formGroupLogin.get('email').hasError('required') ? 'Ingresa el email' :
      this.formGroupLogin.get('email').hasError('pattern') ? 'Ingresa un email válido' : '';
  }

  getErrorPasswordLogin() {
    return this.formGroupLogin.get('password').hasError('required') ? 'Ingresa la contraseña' : '';
  }

  getErrorEmailRegistro() {
    return this.formGroupRegistro.get('email').hasError('required') ? 'Ingresa el email' :
      this.formGroupRegistro.get('email').hasError('pattern') ? 'Ingresa un email válido' :
        this.formGroupRegistro.get('email').hasError('alreadyInUse') ? 'Este email ya está en uso' : '';
  }

  getErrorPasswordRegistro() {
    return this.formGroupRegistro.get('password').hasError('required') ? 'Ingresa una contraseña' :
      this.formGroupRegistro.get('password').hasError('minlength') ? 'Mínimo 6 caracteres' :
        this.formGroupRegistro.get('password').hasError('requirements') ? 'La contraseña debe tener como mínimo 6 caracteres, una letra mayuscula y un número' : '';
  }

  getErrorName() {
    return this.formGroupRegistro.get('name').hasError('required') ? 'El nombre es requerido' :
      this.formGroupRegistro.get('name').hasError('minlength') ? 'Mínimo 4 caracteres' :
        this.formGroupRegistro.get('name').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorAddress() {
    return this.formGroupRegistro.get('address').hasError('required') ? 'La dirección es requerida' :
      this.formGroupRegistro.get('address').hasError('minlength') ? 'Mínimo 3 caracteres' :
        this.formGroupRegistro.get('address').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorPhone() {
    return this.formGroupRegistro.get('phone').hasError('required') ? 'El teléfono es requerido' :
      this.formGroupRegistro.get('phone').hasError('minlength') ? 'Mínimo 10 caracteres' :
        this.formGroupRegistro.get('phone').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

  public selectTab() {
    const tabCount = 2;
    this.selectTabIndex = (this.selectTabIndex + 1) % tabCount;
  }

}
