import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  public createCart(): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'createCart', {}, { headers: headers });
  }

  public addProduct(carId: number, proId: string, quantity: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'addProduct/' + carId + '/' + proId + '/' + quantity, {}, { headers: headers });
  }

  public removeProduct(carId: number, proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.post(this.url + 'removeProduct/' + carId + '/' + proId, {}, { headers: headers });
  }

  public existProductInCart(carId: number, proId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'existProductInCart/' + carId + '/' + proId, { headers: headers });
  }

  public findShoppingProductByShoppingCart(carId: number): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findShoppingProductByShoppingCart/' + carId, { headers: headers });
  }

}
