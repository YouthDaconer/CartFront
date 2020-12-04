import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';
import { HttpService } from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url: string = environment.apiUrl + 'api/cart/';

  createTokenHeader(): HttpHeaders {
    let token = localStorage.getItem('token');
    let headers = new HttpHeaders({ 'Authorization': token });
    return headers;
  }

  constructor(public httpClient: HttpClient) { }

  public createCart(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'createCart/' + email, {}, { headers: headers });
  }

  public addProduct(carId: number, proId: string, quantity: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'addProduct/' + carId + '/' + proId + '/' + quantity, {}, { headers: headers });
  }

  public removeProduct(carId: number, proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'removeProduct/' + carId + '/' + proId, {}, { headers: headers });
  }

  public removeShoppingProduct(carId: number, proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'removeShoppingProduct/' + carId + '/' + proId, {}, { headers: headers });
  }

  public finishPurchase(carId: number, payId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'finishPurchase/' + carId + '/' + payId, {}, { headers: headers });
  }

  public clearCart(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'clearCart/' + carId, {}, { headers: headers });
  }

  public existProductInCart(carId: number, proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'existProductInCart/' + carId + '/' + proId, { headers: headers });
  }

  public findShoppingProductByShoppingCart(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findShoppingProductByShoppingCart/' + carId, { headers: headers });
  }

  public getCurrentUserCart(email: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'getCurrentUserCart/' + email, { headers: headers });
  }

}
