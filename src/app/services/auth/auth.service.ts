import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { StorageService } from '../storage/storage.service';

const AUTH_API = 'http://localhost:8080/api/v1/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  login({ email, password }: any): Observable<any> {
    return this.httpClient.post(AUTH_API + 'login', { email, password }, httpOptions );
  }

  register({ firstName, lastName, email, password }: any): Observable<any> {
    return this.httpClient.post(AUTH_API + 'register', { firstName, lastName, email, password }, httpOptions );
  }

  isLoggedIn(): boolean {
    if(this.storageService.getToken()) {
      return true;
    }
    return false;
  }
}