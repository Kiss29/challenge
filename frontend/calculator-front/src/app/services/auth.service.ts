import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'tokenTest123';
  
  getToken(): string {
    return this.token;
  }
}