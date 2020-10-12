import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { ShoppingCartListComponent } from './component/shopping-cart-list/shopping-cart-list.component';
import { ShoppingProductListComponent } from './component/shopping-product-list/shopping-product-list.component';

const routes: Routes = [
  {path:'customer-list',component:CustomerListComponent},
  {path:'product-list',component:ProductListComponent},
  {path:'payment-method-list',component:PaymentMethodListComponent},
  {path:'shopping-cart-list',component:ShoppingCartListComponent},
  {path:'shopping-product-list',component:ShoppingProductListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
