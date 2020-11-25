import { Component, OnInit } from '@angular/core';
import { ProductService } from "src/app/service/product.service";

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css']
})
export class TiendaComponent implements OnInit {
  public productos = [];

  constructor(private productService: ProductService) {
  }

  findAll(): void {
    this.productService.findAll().subscribe(data => {
      this.productos = data;
    }, error => {
      console.error(error);
    });
  }

  async ngOnInit() {
    this.findAll();
  }

}
