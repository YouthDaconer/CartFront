import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class AuthCartService {

  constructor(public angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    });
  }

  public createUser(customer: Customer, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(customer.email, password);
  }

  public login(email: string, password: string) {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  public signOut() {
    return this.angularFireAuth.signOut();
  }

  public async sendEmailVerification() {
    await (await this.angularFireAuth.currentUser).sendEmailVerification();
  }

  public sendPasswordResetEmail(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email);
  }

}