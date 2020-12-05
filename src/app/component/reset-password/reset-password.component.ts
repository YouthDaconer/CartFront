import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user';
import { FormBuilder, FormGroup, Validators, FormControl, FormGroupDirective } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public formGroupResetPassword: FormGroup;
  private returnUrl: string;
  public selectTabIndex: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public authCartService: AuthCartService,
    public authService: AuthService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createFormResetPassword();
  }

  public resetPassword(post: any, formDirective: FormGroupDirective): void {
    if (this.formGroupResetPassword.status === "VALID") {
      this.authCartService.sendPasswordResetEmail(post.email)
        .then(() => {
          this.authCartService.sendPasswordResetEmail(post.email);
          formDirective.resetForm();
          this.openSnackBar("El correo ha sido enviado", "Ok");
          this.router.navigate(['/login']);
        })
        .catch(e => {
          switch (e.code) {
            case "auth/user-not-found":
              this.openSnackBar("El usuario no existe", "Ok");
              break;
            default:
              console.error(e);
              this.openSnackBar("Estado desconocido", "Ok");
              break;
          }
        });
    }
  }

  createFormResetPassword() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.formGroupResetPassword = this.formBuilder.group({
      'email': [null, [Validators.required, Validators.pattern(emailregex)]],
      'validate': ''
    });
  }

  getErrorEmailResetPassword() {
    return this.formGroupResetPassword.get('email').hasError('required') ? 'Ingresa el email' :
      this.formGroupResetPassword.get('email').hasError('pattern') ? 'Ingresa un email válido' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}
