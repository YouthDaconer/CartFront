import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url: string = environment.apiUrl + 'api/customer/';

  constructor(public httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(email: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + email);
  }

  public save(customer: Customer): Observable<any> {
    return this.httpClient.post(this.url + 'save', customer);
  }

  public update(customer: Customer): Observable<any> {
    return this.httpClient.put(this.url + 'update', customer);
  }

  public delete(email: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + email);
  }

}
