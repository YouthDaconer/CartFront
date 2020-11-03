import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingProductService {

  private url:string = environment.apiUrl + 'api/shoppingProduct/';

  constructor(public httpClient:HttpClient) {}

  public findAll():Observable<any>{
    return this.httpClient.get(this.url+'findAll');
  }

  public findById(shprId:string):Observable<any>{
    return this.httpClient.get(this.url+'findById/'+shprId);
  }

}
