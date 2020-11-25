import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public titulo:string='Lista de Productos';
  public products:Product[];
  public columnas = ['nombre', 'descripcion', 'precio', 'eliminar'];

  constructor(private router: Router, public productService:ProductService) { }

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

  async eliminar(product) {
    if (!confirm("¿Realmente lo quieres eliminar<?")) {
      return;
    }
    await this.productService.delete(product.id);
    this.findAll();
  }

  navegarAFormulario() {
    this.router.navigateByUrl("/product-save");
  }

}
