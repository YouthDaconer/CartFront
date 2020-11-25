import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { Enable } from 'src/app/domain/enable';
import { ProductService } from 'src/app/service/product.service';
import { EnableService } from 'src/app/service/enable.service';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-product-save',
  templateUrl: './product-save.component.html',
  styleUrls: ['./product-save.component.css']
})
export class ProductSaveComponent implements OnInit {

  public product: Product;
  public enables: Enable[];

  public showMsg: boolean = false;
  public messages: string[] = [""];
  public cargando = false;

  constructor(public productService: ProductService,
    public enableService: EnableService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.product = new Product("", "", 0, "", "", "Y");
    this.findAllEnable();
  }

  public findAllEnable(): void {
    this.enables = this.enableService.findAll();
  }

  public save(): void {
    this.messages = [""];
    this.cargando = true;
    this.productService.save(this.product).subscribe(ok => {
      this.showMsg = true;
      this.messages[0] = "El producto se grabó con éxito";
      this.snackBar.open("Producto guardado", "", {
        duration: 1500,
        horizontalPosition: "start",
        verticalPosition: "top",
      });
      this.cargando = false;
    }, err => {
      console.log(err);
      this.showMsg = true;
      this.messages = err.error.error;
    });
  }

}
