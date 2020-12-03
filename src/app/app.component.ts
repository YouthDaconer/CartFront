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
      switch (mensaje) {
        case "car_updated":
          this.refrescarCarrito();
          break;
        case "car_check":
          this.checkCurrentUserCart();
          break;
        default:
          break;
      }
    })
  }

  public refrescarCarrito() {
    this.cartService.findShoppingProductByShoppingCart(+localStorage.getItem("cartActive")).subscribe(data => {
      this.shoppingProducts = data;
    }, error => {
      console.error(error);
    });
  }

  public checkCurrentUserCart(): void {
    if (this.isAuth()) {
      let emailLogged = JSON.parse(localStorage.getItem("user")).email;
      this.cartService.getCurrentUserCart(emailLogged).subscribe(data => {
        if (data === null) {
          // Crea el carrito de compras vacio
          this.cartService.createCart(emailLogged).subscribe(data => {
            localStorage.setItem("cartActive", data.carId);
          }, error => {
            console.error(error);
          });
        } else {
          localStorage.setItem("cartActive", data.carId);
          this.refrescarCarrito();
        }
      }, error => {
        console.error(error);
      });
    }
  }

  ngOnInit(): void {
    this.checkCurrentUserCart();
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
    let bandera: boolean = false;
    if (!!localStorage.getItem('user') && !!localStorage.getItem('usuario')) {
      bandera = true;
    }
    return bandera;
  }

  public toggleMenu(menu: any): void {
    menu.toggle();
  }
}
