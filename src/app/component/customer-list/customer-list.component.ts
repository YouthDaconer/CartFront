import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Customer } from 'src/app/domain/customer';
import { CustomerService } from 'src/app/service/customer.service';
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  public titulo: string = 'Lista de Clientes';
  public columnas = ['name', 'email', 'address', 'phone', 'update', 'status'];
  public dataSource = new MatTableDataSource<Customer>();
  public jsonUserLoggedIn = JSON.parse(localStorage.getItem("user"));

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, public customerService: CustomerService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let roleLoggedIn = localStorage.getItem("role");
    if (roleLoggedIn != "0") {
      this.router.navigate(["/no-autorizado"]);
    } else {
      this.findAll();
    }
  }

  findAll(): void {
    this.customerService.findAll().subscribe(res => {
      this.dataSource.data = res as Customer[];
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

  public desactivarCliente(customer) {
    if (this.jsonUserLoggedIn.uid != customer.token) {
      if (!confirm("¿Realmente quieres desactivar el cliente?")) {
        return;
      }
      customer.enable = 'N';
      this.customerService.update(customer).subscribe(ok => {
        this.findAll();
        this.snackBar.open("Cliente desactivado correctamente", "", {
          duration: 1500,
          horizontalPosition: "center",
          verticalPosition: "top",
        });
      }, error => {
        console.log(error);
      });
    } else {
      this.snackBar.open("¡No te puedes desactivar a ti mismo!", "", {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }
  }

  public activarCliente(customer) {
    if (!confirm("¿Realmente quieres activar el cliente?")) {
      return;
    }
    customer.enable = 'Y';
    this.customerService.update(customer).subscribe(ok => {
      this.findAll();
      this.snackBar.open("Cliente activado correctamente", "", {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }, error => {
      console.log(error);
    });
  }

  navegarAFormulario() {
    this.router.navigateByUrl("/customer-save");
  }

  public filtrar = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToUpdate = (id: string) => {
    this.router.navigate(["/customer-edit", id]);
  }

}
