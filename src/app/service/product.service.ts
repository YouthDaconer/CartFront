import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../domain/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = environment.apiUrl + 'api/product/';

  constructor(public httpClient: HttpClient) { }

  public findAll(): Observable<any> {
    return this.httpClient.get(this.url + 'findAll');
  }

  public findById(proId: string): Observable<any> {
    return this.httpClient.get(this.url + 'findById/' + proId);
  }

  public save(product: Product): Observable<any> {
    return this.httpClient.post(this.url + 'save', product);
  }

  public update(product: Product): Observable<any> {
    return this.httpClient.put(this.url + 'update', product);
  }

  public delete(proId: string): Observable<any> {
    return this.httpClient.delete(this.url + 'delete/' + proId);
  }

}
