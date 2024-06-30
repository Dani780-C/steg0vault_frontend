import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly AUTH_API: string =environment.API_BASE_URL + 'auth/'; 

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  login({ email, password }: any): Observable<any> {
    return this.httpClient.post(this.AUTH_API + 'login', { email, password }, httpOptions );
  }

  register({ firstName, lastName, email, password }: any): Observable<any> {
    return this.httpClient.post(this.AUTH_API + 'register', { firstName, lastName, email, password }, httpOptions );
  }

  forgotPassword(mail: string | null): Observable<any> {
    return this.httpClient.get('http://localhost:8080/api/v1/forgot-pass/request?mail='+mail, httpOptions );
  }

  resetPassword({ newPassword, retypedNewPassword, token }: any): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/v1/forgot-pass/reset-password', { newPassword, retypedNewPassword, token }, httpOptions );
  }

  isLoggedIn(): boolean {
    if(this.storageService.getToken()) {
      return true;
    }
    return false;
  }
}  