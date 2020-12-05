import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "src/app/service/shopping-cart.service";
import { ActivatedRoute } from "@angular/router";
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-detalle-de-venta',
  templateUrl: './detalle-de-venta.component.html',
  styleUrls: ['./detalle-de-venta.component.css']
})
export class DetalleDeVentaComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute) {
  }

  public shoppingCart: ShoppingCart = null;
  public shoppingProducts = [];

  public columnas = ['nombre', 'imagen', 'cantidad', 'precio'];

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    await this.getShoppingCart(id);
    await this.getShoppingProducts(id);
  }

  public async getShoppingCart(id: any) {
    this.shoppingCartService.findById(id).subscribe(res => {
      this.shoppingCart = res;
    }, error => {
      console.error(error);
    });
  }

  public async getShoppingProducts(id: any) {
    this.cartService.findShoppingProductByShoppingCart(id).subscribe(data => {
      this.shoppingProducts = data;
    }, error => {
      console.error(error);
    });
  }

  public imagenPrincipal(urls: string) {
    return urls.split(";")[0];
  }

}
