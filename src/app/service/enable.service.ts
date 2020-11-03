import { Injectable } from '@angular/core';
import { Enable } from '../domain/enable';

@Injectable({
  providedIn: 'root'
})
export class EnableService {

  public enables: Enable[];

  constructor() {
    this.enables = [
      { id: 'Y', name: 'SI' },
      { id: 'N', name: 'NO' }];
  }

  public findAll(): Enable[] {
    return this.enables;
  }
}
