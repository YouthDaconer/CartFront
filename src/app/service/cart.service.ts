import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
    return this.httpClient.get(this.url + 'createCart', { headers: headers });
  }

  public findShoppingProductByShoppingCart(carId: string): Observable<any> {
    let headers = this.createTokenHeader();
    return this.httpClient.get(this.url + 'findShoppingProductByShoppingCart/' + carId, { headers: headers });
  }

}
