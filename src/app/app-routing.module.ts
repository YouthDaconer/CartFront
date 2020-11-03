import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './component/customer-list/customer-list.component';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { ShoppingCartListComponent } from './component/shopping-cart-list/shopping-cart-list.component';
import { ShoppingProductListComponent } from './component/shopping-product-list/shopping-product-list.component';
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { PaymentMethodSaveComponent } from './component/payment-method-save/payment-method-save.component';
import { PaymentMethodEditComponent } from './component/payment-method-edit/payment-method-edit.component';

const routes: Routes = [
  { path: 'customer-list', component: CustomerListComponent },
  { path: 'customer-save', component: CustomerSaveComponent },
  { path: 'customer-edit/:email', component: CustomerEditComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'payment-method-list', component: PaymentMethodListComponent },
  { path: 'shopping-cart-list', component: ShoppingCartListComponent },
  { path: 'shopping-product-list', component: ShoppingProductListComponent },
  { path: 'product-save', component: ProductSaveComponent },
  { path: 'product-edit/:proId', component: ProductEditComponent },
  { path: 'payment-method-save', component: PaymentMethodSaveComponent },
  { path: 'payment-method-edit/:payId', component: PaymentMethodEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
