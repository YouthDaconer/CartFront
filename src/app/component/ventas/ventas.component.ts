import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from "src/app/service/shopping-cart.service";
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCart } from 'src/app/domain/shoppingCart';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {
  }

  public columnas = ['cliente', 'direccion', 'cantidad', 'metodoPago', 'total', 'detalles'];
  public dataSource = new MatTableDataSource<ShoppingCart>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    await this.getShoppingCarts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public filtrar = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public async getShoppingCarts() {
    this.shoppingCartService.findAll().subscribe(res => {
      this.dataSource.data = res as ShoppingCart[];
    }, error => {
      console.error(error);
    });
  }

  public verDetalle(id) {
    this.router.navigate(["/detalle-venta", id]);
  }

}
