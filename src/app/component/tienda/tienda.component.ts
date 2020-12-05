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

  findAllEnable(): void {
    this.productService.findAllEnable().subscribe(data => {
      this.productos = data;
    }, error => {
      console.error(error);
    });
  }

  async ngOnInit() {
    this.findAllEnable();
  }

}
