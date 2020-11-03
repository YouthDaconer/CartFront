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
import { CustomerSaveComponent } from './component/customer-save/customer-save.component';

import { FormsModule } from '@angular/forms';
import { CustomerEditComponent } from './component/customer-edit/customer-edit.component';
import { ProductSaveComponent } from './component/product-save/product-save.component';
import { ProductEditComponent } from './component/product-edit/product-edit.component';
import { PaymentMethodSaveComponent } from './component/payment-method-save/payment-method-save.component';
import { PaymentMethodEditComponent } from './component/payment-method-edit/payment-method-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerListComponent,
    ProductListComponent,
    PaymentMethodListComponent,
    ShoppingCartListComponent,
    ShoppingProductListComponent,
    CustomerSaveComponent,
    CustomerEditComponent,
    ProductSaveComponent,
    ProductEditComponent,
    PaymentMethodSaveComponent,
    PaymentMethodEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
