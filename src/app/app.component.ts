import { Component, OnInit } from '@angular/core';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { CartService } from './service/cart.service';
import { DataSharingService } from "./service/data-sharing.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cart-front';
  public shoppingProducts: ShoppingProduct[];

  constructor(private cartService: CartService, private dataSharingService: DataSharingService) {

    // Comunicación entre componentes
    this.dataSharingService.currentMessage.subscribe(mensaje => {
      if (mensaje == "car_updated") {
        this.refrescarCarrito();
      }
    })
  }

  public async refrescarCarrito() {
    this.cartService.findShoppingProductByShoppingCart("4").subscribe(data => {
      this.shoppingProducts = data;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    this.refrescarCarrito();
  }

  public total() {
    console.log(this.shoppingProducts);
    let total = 0;
    this.shoppingProducts.forEach(p => total += p.total);
    return total;
  }

  public isAuth(): boolean {
    return !!localStorage.getItem('usuario');
  }
}
