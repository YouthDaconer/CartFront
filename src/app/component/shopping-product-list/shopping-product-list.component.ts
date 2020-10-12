import { Component, OnInit } from '@angular/core';
import { ShoppingProduct } from 'src/app/domain/shoppingProduct';
import { ShoppingProductService } from 'src/app/service/shopping-product.service';

@Component({
  selector: 'app-shopping-product-list',
  templateUrl: './shopping-product-list.component.html',
  styleUrls: ['./shopping-product-list.component.css']
})
export class ShoppingProductListComponent implements OnInit {

  public titulo: string = 'Lista de Shopping Products';
  public shoppingProducts: ShoppingProduct[];

  constructor(public shoppingProductService: ShoppingProductService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.shoppingProductService.findAll().subscribe(data => {
      this.shoppingProducts = data;
    }, error => {
      console.error(error);
    });
  }

}
