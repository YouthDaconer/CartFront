import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "src/app/domain/product";
import { CartService } from "src/app/service/cart.service";
import { DataSharingService } from "src/app/service/data-sharing.service";
import { environment } from "src/environments/environment";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';

@Component({
  selector: 'app-detalle-de-producto',
  templateUrl: './detalle-de-producto.component.html',
  styleUrls: ['./detalle-de-producto.component.css']
})

export class DetalleDeProductoComponent implements OnInit {
  public producto = new Product(
    "",
    "",
    0,
    "",
    "",
    ""
  );
  public fotos = [];
  public fotoSeleccionada: string;
  public indiceSeleccionado = 0;
  public shoppingProductExistente: ShoppingProduct = null;
  public quantity = 0;
  public breakpoint = 0;

  constructor(private cartService: CartService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("proId");
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 2;

    this.productService.findById(id).subscribe(data => {
      this.producto = data;
      this.fotos = this.producto.image.split(";");

      if (this.fotos.length > 0) {
        this.seleccionarImagen(0);
      }

      this.refrescarEstado();
    }, error => {
      console.error(error);
    });
  }

  public seleccionarImagen(indice) {
    this.indiceSeleccionado = indice;
    this.fotoSeleccionada = this.fotos[this.indiceSeleccionado];
  }

  public quitarDelCarrito() {
    const { proId } = this.producto;

    this.cartService.removeProduct(+localStorage.getItem("cartActive"), proId).subscribe(data => {
      const respuesta = data;
      this.refrescarEstado();
      this.openSnackBar("Producto eliminado con éxito", "Ok");
    }, error => {
      console.error(error);
    });
  }

  public quitarProductos() {
    const { proId } = this.producto;

    this.cartService.removeShoppingProduct(+localStorage.getItem("cartActive"), proId).subscribe(data => {
      this.refrescarEstado();
      this.openSnackBar("Productos eliminados con éxito", "Ok");
    }, error => {
      console.error(error);
    });
  }

  public agregarAlCarrito() {
    const { proId } = this.producto;

    if (this.quantity > 0) {
      this.cartService.addProduct(+localStorage.getItem("cartActive"), proId, this.quantity).subscribe(data => {
        const respuesta = data;
        this.quantity = 0;
        this.refrescarEstado();
        this.openSnackBar("Producto agregado con éxito", "Ok");
      }, error => {
        console.error(error);
      });

      this.refrescarEstado();
    } else {
      this.openSnackBar("La cantidad debe ser mayor a 0", "Ok");
    }
  }

  refrescarEstado() {
    const { proId } = this.producto;

    this.cartService.existProductInCart(+localStorage.getItem("cartActive"), proId).subscribe(data => {
      this.shoppingProductExistente = data;
    }, error => {
      console.error(error);
    });

    // Comunicación entre componentes
    this.dataSharingService.changeMessage("car_updated");
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 2;
  }

}
