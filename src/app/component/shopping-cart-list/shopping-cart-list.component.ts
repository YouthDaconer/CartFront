import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/domain/shoppingCart';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart-list',
  templateUrl: './shopping-cart-list.component.html',
  styleUrls: ['./shopping-cart-list.component.css']
})
export class ShoppingCartListComponent implements OnInit {

  public titulo: string = 'Lista de Shopping Carts';
  public shoppingCarts: ShoppingCart[];

  constructor(public shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.shoppingCartService.findAll().subscribe(data => {
      this.shoppingCarts = data;
    }, error => {
      console.error(error);
    });
  }

}
