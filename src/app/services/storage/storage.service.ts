import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setToken(key : string, token: string): void {
    localStorage.setItem(key, token);
  }

  deleteJwtToken() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken() : void {
    localStorage.removeItem('token');
  }

  setCurrentlyLoggedUsername(user: string) {
    localStorage.setItem("name", user);
  }

  setCurrentlyLoggedUserEmail(mail: string | null) {
    if(mail === null)
      localStorage.setItem("mail", "unknown");
    else
    localStorage.setItem("mail", mail);
  }

  getCurrentlyLoggedUsername() : string | null {
    return localStorage.getItem("name");
  }

  getCurrentlyLoggedUserEmail() : string | null {
    return localStorage.getItem("mail");
  }

  removeEmail() {
    localStorage.removeItem('mail');
  }

}
