import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PaymentMethod } from 'src/app/domain/paymentMethod';
import { PaymentMethodService } from 'src/app/service/payment-method.service';
import { Router } from "@angular/router";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.css']
})
export class PaymentMethodListComponent implements OnInit {

  public titulo: string = 'Lista de métodos de pago';
  public columnas = ['name', 'update', 'status'];
  public dataSource = new MatTableDataSource<PaymentMethod>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, public paymentMethodService: PaymentMethodService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let roleLoggedIn = localStorage.getItem("role");
    if (roleLoggedIn != "0") {
      this.router.navigate(["/no-autorizado"]);
    } else {
      this.findAll();
    }
  }

  findAll(): void {
    this.paymentMethodService.findAll().subscribe(res => {
      this.dataSource.data = res as PaymentMethod[];
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

  public desactivarMetodoDePago(paymentMethod) {
    if (!confirm("¿Realmente quieres desactivar el método de pago?")) {
      return;
    }
    paymentMethod.enable = 'N';
    this.paymentMethodService.update(paymentMethod).subscribe(ok => {
      this.findAll();
      this.snackBar.open("Método de pago desactivado correctamente", "", {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }, error => {
      console.log(error);
    });
  }

  public activarMetodoDePago(paymentMethod) {
    if (!confirm("¿Realmente quieres activar el método de pago?")) {
      return;
    }
    paymentMethod.enable = 'Y';
    this.paymentMethodService.update(paymentMethod).subscribe(ok => {
      this.findAll();
      this.snackBar.open("Método de pago activado correctamente", "", {
        duration: 1500,
        horizontalPosition: "center",
        verticalPosition: "top",
      });
    }, error => {
      console.log(error);
    });
  }

  navegarAFormulario() {
    this.router.navigateByUrl("/payment-method-save");
  }

  public filtrar = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToUpdate = (id: string) => {
    this.router.navigate(["/payment-method-edit", id]);
  }

}
