import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from "src/app/service/shopping-cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { CartService } from 'src/app/service/cart.service';
import { DataSharingService } from 'src/app/service/data-sharing.service';

@Component({
  selector: 'app-detalle-de-venta',
  templateUrl: './detalle-de-venta.component.html',
  styleUrls: ['./detalle-de-venta.component.css']
})
export class DetalleDeVentaComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private dataSharingService: DataSharingService,
    private router: Router) {
  }

  public shoppingCart: ShoppingCart = null;
  public shoppingProducts = [];
  public roleLoggedIn = localStorage.getItem("role");
  public linkCompras: string = '';

  public columnas = ['nombre', 'imagen', 'cantidad', 'precio'];

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get("id");
    this.linkCompras = "/customer-shopping-cart/" + JSON.parse(localStorage.getItem("user")).email;
    await this.getShoppingCart(id);
  }

  public goBack() {
    // Comunicación entre componentes
    this.dataSharingService.changeMessage("go_back");
  }

  public async getShoppingCart(id: any) {
    this.shoppingCartService.findById(id).subscribe(res => {
      this.shoppingCart = res;
      const email = this.shoppingCart.email;
      let emailLogged = JSON.parse(localStorage.getItem("user")).email;
      let roleLoggedIn = localStorage.getItem("role");
      const id = this.activatedRoute.snapshot.paramMap.get("id");

      if (email !== emailLogged) {
        if (roleLoggedIn != "0") {
          this.router.navigate(["/no-autorizado"]);
        } else {
          this.getShoppingProducts(id);
        }
      } else {
        this.getShoppingProducts(id);
      }
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
