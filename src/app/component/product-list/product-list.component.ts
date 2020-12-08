import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/service/product.service';
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  public titulo: string = 'Lista de Productos';
  public columnas = ['name', 'detail', 'price', 'update', 'status'];
  public dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, public productService: ProductService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let roleLoggedIn = localStorage.getItem("role");
    if (roleLoggedIn != "0") {
      this.router.navigate(["/no-autorizado"]);
    } else {
      this.findAll();
    }
  }

  findAll(): void {
    this.productService.findAll().subscribe(res => {
      this.dataSource.data = res as Product[];
    }, error => {
      console.error(error);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public customSort = (event) => {
    console.log(event);
  }

  public desactivarProducto(product) {
    if (!confirm("¿Realmente quieres desactivar el producto?")) {
      return;
    }
    product.enable = 'N';
    this.productService.update(product).subscribe(ok => {
      this.findAll();
      this.snackBar.open("Producto desactivado correctamente", "", {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }, error => {
      console.log(error);
    });
  }

  public activarProducto(product) {
    if (!confirm("¿Realmente quieres activar el producto?")) {
      return;
    }
    product.enable = 'Y';
    this.productService.update(product).subscribe(ok => {
      this.findAll();
      this.snackBar.open("Producto activado correctamente", "", {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }, error => {
      console.log(error);
    });
  }

  navegarAFormulario() {
    this.router.navigateByUrl("/product-save");
  }

  public filtrar = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToUpdate = (id: string) => {
    this.router.navigate(["/product-edit", id]);
  }

}
