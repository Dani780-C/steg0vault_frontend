import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResource } from 'src/app/interfaces/post-resource';
import { StorageService } from '../storage/storage.service';
import { UpdateResource } from 'src/app/interfaces/updateResource';

const USER_API = 'http://localhost:8080/api/v1/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders()
    };    
  }

  getUserInfo(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get('http://localhost:8080/api/v1/user/info', this.httpOptions );
  }

  changePassword({ newPassword, retypedNewPassword }: any): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.post('http://localhost:8080/api/v1/user/change-password', { newPassword, retypedNewPassword }, this.httpOptions );
  }

  updateUser(firstName: string, lastName: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.patch('http://localhost:8080/api/v1/user/update', {firstName, lastName}, this.httpOptions );
  }

  deleteAccount(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.delete('http://localhost:8080/api/v1/user/delete-account', this.httpOptions);
  }
}

