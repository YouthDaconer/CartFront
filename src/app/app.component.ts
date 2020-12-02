import { Component, OnInit } from '@angular/core';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { CartService } from './service/cart.service';
import { DataSharingService } from "./service/data-sharing.service";
import { AuthCartService } from 'src/app/service/auth-cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'cart-front';
  public shoppingProducts: ShoppingProduct[];

  constructor(private cartService: CartService,
    private dataSharingService: DataSharingService,
    public authCartService: AuthCartService,
    private route: ActivatedRoute,
    private router: Router) {

    // Comunicación entre componentes
    this.dataSharingService.currentMessage.subscribe(mensaje => {
      if (mensaje == "car_updated") {
        this.refrescarCarrito();
      }
    })
  }

  public refrescarCarrito() {
    this.cartService.findShoppingProductByShoppingCart(4).subscribe(data => {
      this.shoppingProducts = data;
    }, error => {
      console.error(error);
    });
  }

  ngOnInit(): void {
    if (this.isAuth()) {
      this.refrescarCarrito();
    }
  }

  public total() {
    let total = 0;
    if (typeof (this.shoppingProducts) !== "undefined") {
      this.shoppingProducts.forEach(p => total += p.total);
    }
    return total;
  }

  public numProductos() {
    let suma = 0;
    if (typeof (this.shoppingProducts) !== "undefined") {
      this.shoppingProducts.forEach(p => suma += p.quantity);
    }
    return suma;
  }

  public singOut(): void {
    this.authCartService.singOut()
      .then(() => {
        localStorage.clear();
        this.router.navigate(['/login']);
      })
      .catch(e => {
        this.router.navigate(['/login']);
      });
  }

  public isAuth(): boolean {
    return !!localStorage.getItem('usuario');
  }

  public toggleMenu(menu: any): void {
    menu.toggle();
  }
}
