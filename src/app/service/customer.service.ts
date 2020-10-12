import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url:string='http://localhost:9090/api/customer/';



  constructor(public httpClient:HttpClient) {}

  public findAll():Observable<any>{
    return this.httpClient.get(this.url+'findAll');
  }

  public findById(email:string):Observable<any>{
    return this.httpClient.get(this.url+'findById/'+email);
  }

}
