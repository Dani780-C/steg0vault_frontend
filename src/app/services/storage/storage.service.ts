import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(key : string, token: string): void {
    localStorage.setItem(key, token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() : void {
    localStorage.removeItem('token');
  }

}
