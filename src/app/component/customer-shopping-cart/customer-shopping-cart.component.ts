import { Component, OnInit, ViewChild } from '@angular/core';
import { ShoppingCartService } from "src/app/service/shopping-cart.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShoppingCart } from 'src/app/domain/shoppingCart';

@Component({
  selector: 'app-customer-shopping-cart',
  templateUrl: './customer-shopping-cart.component.html',
  styleUrls: ['./customer-shopping-cart.component.css']
})
export class CustomerShoppingCartComponent implements OnInit {

  constructor(private shoppingCartService: ShoppingCartService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  public columnas = ['cliente', 'direccion', 'cantidad', 'metodoPago', 'total', 'detalles'];
  public dataSource = new MatTableDataSource<ShoppingCart>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async ngOnInit() {
    const email = this.activatedRoute.snapshot.paramMap.get("email");
    let emailLogged = JSON.parse(localStorage.getItem("user")).email;
    if (email !== emailLogged) {
      this.router.navigate(["/no-autorizado"]);
    } else {
      await this.getShoppingCarts(email);
    }
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

  public async getShoppingCarts(email: string) {
    this.shoppingCartService.findByEmail(email).subscribe(res => {
      this.dataSource.data = res as ShoppingCart[];
    }, error => {
      console.error(error);
    });
  }

  public verDetalle(id) {
    this.router.navigate(["/detalle-venta", id]);
  }

}
