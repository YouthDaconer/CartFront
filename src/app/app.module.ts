import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerListComponent } from './component/customer-list/customer-list.component';

import {HttpClientModule} from '@angular/common/http';
import { ProductListComponent } from './component/product-list/product-list.component';
import { PaymentMethodListComponent } from './component/payment-method-list/payment-method-list.component';
import { ShoppingCartListComponent } from './component/shopping-cart-list/shopping-cart-list.component';
import { ShoppingProductListComponent } from './component/shopping-product-list/shopping-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    ShoppingCartListComponent,
    ShoppingProductListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
