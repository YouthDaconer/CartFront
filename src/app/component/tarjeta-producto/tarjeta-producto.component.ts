import { Component, Input, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tarjeta-producto',
  templateUrl: './tarjeta-producto.component.html',
  styleUrls: ['./tarjeta-producto.component.css']
})
export class TarjetaProductoComponent implements OnInit {
  @Input() producto: any;
  public image: string = "";

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.image = this.producto.image.split(";")[0];
  }

  public detalles() {
    this.router.navigate(["/producto/detalle", this.producto.proId])
  }

}
