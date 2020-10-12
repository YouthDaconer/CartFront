import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private url:string='http://localhost:9090/api/shoppingCart/';

  constructor(public httpClient:HttpClient) {}

  public findAll():Observable<any>{
    return this.httpClient.get(this.url+'findAll');
  }

  public findById(carId:string):Observable<any>{
    return this.httpClient.get(this.url+'findById/'+carId);
  }

}
