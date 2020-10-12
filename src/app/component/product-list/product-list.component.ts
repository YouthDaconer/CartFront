import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public titulo:string='Lista de Productos';
  public products:Product[];

  constructor(public productService:ProductService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll():void{
    this.productService.findAll().subscribe(data=>{
        this.products=data;
    },error=>{
        console.error(error);
    });
  }

}
