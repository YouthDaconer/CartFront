import { Component, ElementRef, OnInit } from '@angular/core';
import { CartService } from "src/app/service/cart.service";
import { DataSharingService } from "src/app/service/data-sharing.service";
import { CustomerService } from "src/app/service/customer.service";
import { PaymentMethodService } from "src/app/service/payment-method.service";
import { Customer } from "src/app/domain/customer";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from "src/app/domain/product";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-terminar-compra',
  templateUrl: './terminar-compra.component.html',
  styleUrls: ['./terminar-compra.component.css']
})
export class TerminarCompraComponent implements OnInit {

  constructor(private cartService: CartService,
    private customerService: CustomerService,
    private paymentMethodService: PaymentMethodService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dataSharingService: DataSharingService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder) {
  }

  public compraTerminada: boolean = false;
  public shoppingProducts = [];
  public paymentMethods = [];
  public columnas = ['name', 'price', 'quantity', 'image', 'total', 'quitar'];
  public customer = new Customer("", "", "Y", "", "", "", 0);
  public payId: number = 0;
  public formGroupCheckout: FormGroup = null;

  async ngOnInit() {
    await this.checkShoppingProducts();
    await this.createFormCheckout();
    await this.getShoppingProducts();
    await this.getCustomer();
    await this.getPaymentMethods();
  }

  public async checkShoppingProducts() {
    this.cartService.findShoppingProductByShoppingCart(+localStorage.getItem("cartActive")).subscribe(data => {
      if (data.length == 0) {
        this.router.navigate([this.activatedRoute.snapshot.queryParams.returnUrl || '/tienda']);
      } else {
        this.shoppingProducts = data;
      }
    }, error => {
      console.error(error);
    });
  }

  public imagenPrincipal(urls: string) {
    return urls.split(";")[0];
  }

  public checkout(post: any, stepper: any) {
    if (this.formGroupCheckout.status === "VALID") {
      this.customer.address = post.address;
      this.customer.phone = post.phone;
      this.customerService.update(this.customer).subscribe(data => {
        this.cartService.finishPurchase(+localStorage.getItem("cartActive"), post.payId).subscribe(data => {
          this.compraTerminada = true;
          stepper.next();
          // Comunicación entre componentes
          this.dataSharingService.changeMessage("car_check");
        }, error => {
          console.error(error);
        });
      }, error => {
        console.error(error);
      });
    }
  }

  public backToResume(stepper) {
    stepper.back();
  }

  public async getShoppingProducts() {
    this.cartService.findShoppingProductByShoppingCart(+localStorage.getItem("cartActive")).subscribe(data => {
      this.shoppingProducts = data;
    }, error => {
      console.error(error);
    });
  }

  public async getPaymentMethods() {
    this.paymentMethodService.findAllEnable().subscribe(data => {
      this.paymentMethods = data;
    }, error => {
      console.error(error);
    });
  }

  public async getCustomer() {
    this.customerService.findById(JSON.parse(localStorage.getItem("user")).email).subscribe(data => {
      this.customer = data;
      this.formGroupCheckout.patchValue({
        address: this.customer.address,
        phone: this.customer.phone
      });
    }, error => {
      console.error(error);
    });
  }

  public total() {
    let total = 0;
    if (typeof (this.shoppingProducts) !== "undefined") {
      this.shoppingProducts.forEach(p => total += p.total);
    }
    return total;
  }

  public removeShoppingProduct(product: Product) {
    this.cartService.removeShoppingProduct(+localStorage.getItem("cartActive"), product.proId).subscribe(data => {
      this.checkShoppingProducts();
      // Comunicación entre componentes
      this.dataSharingService.changeMessage("car_updated");
      this.openSnackBar("Productos eliminados con éxito", "Ok");
    }, error => {
      console.error(error);
    });
  }

  async createFormCheckout() {
    this.formGroupCheckout = this.formBuilder.group({
      'payId': [null, [Validators.required]],
      'address': [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      'phone': [null, [Validators.required, Validators.minLength(10), Validators.maxLength(255)]],
      'validate': ''
    });
  }

  getErrorAddress() {
    return this.formGroupCheckout.get('address').hasError('required') ? 'La dirección es requerida' :
      this.formGroupCheckout.get('address').hasError('minlength') ? 'Mínimo 3 caracteres' :
        this.formGroupCheckout.get('address').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorPhone() {
    return this.formGroupCheckout.get('phone').hasError('required') ? 'El teléfono es requerido' :
      this.formGroupCheckout.get('phone').hasError('minlength') ? 'Mínimo 10 caracteres' :
        this.formGroupCheckout.get('phone').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorPayId() {
    return this.formGroupCheckout.get('payId').hasError('required') ? 'El método de pago es requerido' : '';
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: "center",
      verticalPosition: "top",
    });
  }

}
