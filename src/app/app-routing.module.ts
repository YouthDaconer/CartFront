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
import { TiendaComponent } from './component/tienda/tienda.component';
import { LoginComponent } from './component/login/login.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  { path: 'customer-list', component: CustomerListComponent, canActivate:[AuthGuard] },
  { path: 'customer-save', component: CustomerSaveComponent, canActivate:[AuthGuard] },
  { path: 'customer-edit/:email', component: CustomerEditComponent, canActivate:[AuthGuard] },
  { path: 'product-list', component: ProductListComponent, canActivate:[AuthGuard] },
  { path: 'payment-method-list', component: PaymentMethodListComponent, canActivate:[AuthGuard] },
  { path: 'shopping-cart-list', component: ShoppingCartListComponent, canActivate:[AuthGuard] },
  { path: 'shopping-product-list', component: ShoppingProductListComponent, canActivate:[AuthGuard] },
  { path: 'product-save', component: ProductSaveComponent, canActivate:[AuthGuard] },
  { path: 'product-edit/:proId', component: ProductEditComponent, canActivate:[AuthGuard] },
  { path: 'payment-method-save', component: PaymentMethodSaveComponent, canActivate:[AuthGuard] },
  { path: 'payment-method-edit/:payId', component: PaymentMethodEditComponent, canActivate:[AuthGuard] },
  { path: 'tienda', component: TiendaComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
