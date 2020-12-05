import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { Enable } from 'src/app/domain/enable';
import { ProductService } from 'src/app/service/product.service';
import { EnableService } from 'src/app/service/enable.service';
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  @ViewChild('price') price: ElementRef;
  public product: Product = null;
  public flag: boolean = false;
  public cargando = false;

  formGroup: FormGroup;
  titleAlert: string = '';
  post: any = '';

  constructor(public productService: ProductService,
    public enableService: EnableService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router) { }

  async ngOnInit() {
    await this.createForm();
    await this.getProduct();
  }

  public async getProduct() {
    const id = this.activatedRoute.snapshot.paramMap.get("proId");
    this.productService.findById(id).subscribe(data => {
      this.product = data;
    }, error => {
      console.error(error);
    });
  }

  public update(): void {
    let flag: boolean = false;
    flag = this.checkPrice();
    if (this.formGroup.status === "VALID" && flag) {
      this.cargando = true;
      this.product.enable = 'Y';
      this.productService.update(this.product).subscribe(ok => {
        this.snackBar.open("Producto actualizado", "", {
          duration: 1500,
          horizontalPosition: "center",
          verticalPosition: "top",
        });
        this.cargando = false;
        this.router.navigate(['/product-list']);
      }, err => {
        console.log(err);
      });
    }
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      'detail': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
      'proId': [null, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      'name': [null, [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
      'price': [null, [Validators.required]],
      'image': [null, [Validators.required]],
      'validate': ''
    });
  }

  onSubmit(post) {
    this.post = post;
  }

  getErrorProId() {
    return this.formGroup.get('proId').hasError('required') ? 'El ID del producto es requerido' :
      this.formGroup.get('proId').hasError('minlength') ? 'Mínimo 5 caracteres' :
        this.formGroup.get('proId').hasError('maxlength') ? 'Máximo 100 caracteres' : '';
  }

  getErrorName() {
    return this.formGroup.get('name').hasError('required') ? 'El nombre es requerido' :
      this.formGroup.get('name').hasError('minlength') ? 'Mínimo 4 caracteres' :
        this.formGroup.get('name').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorDetail() {
    return this.formGroup.get('detail').hasError('required') ? 'El detalle es requerido' :
      this.formGroup.get('detail').hasError('minlength') ? 'Mínimo 5 caracteres' :
        this.formGroup.get('detail').hasError('maxlength') ? 'Máximo 255 caracteres' : '';
  }

  getErrorPrice() {
    return this.formGroup.get('price').hasError('required') ? 'El precio es requerido' : '';
  }

  getErrorImage() {
    return this.formGroup.get('name').hasError('required') ? 'La imagen es requerida' : '';
  }

  checkPrice(): boolean {
    if (this.price.nativeElement.value === "COP$ 0,00") {
      this.snackBar.open("Por favor indique el precio del producto", "", {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
      this.price.nativeElement.focus();
      return false
    }
    return true;
  }

}
