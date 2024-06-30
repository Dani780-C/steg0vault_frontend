import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  httpOptions: any;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders()
    };    
  }

  getAllUsers(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get('http://localhost:8080/api/v1/admin/users/all', this.httpOptions );
  }

  getAllAlgs(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get('http://localhost:8080/api/v1/admin/algs/all', this.httpOptions );
  }

  createAdmin({ firstName, lastName, email, password }: any): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.post('http://localhost:8080/api/v1/admin/create-admin', { firstName, lastName, email, password }, this.httpOptions );
  }

  createAlgorithm({ algorithmName }: any): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    };
    return this.httpClient.post('http://localhost:8080/api/v1/admin/alg/create', algorithmName, this.httpOptions );
  }

  getMoreInfo(id: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get('http://localhost:8080/api/v1/admin/get-details/' + id, this.httpOptions );
  }

  markAsInactive(id: number, banned: boolean): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    };
    let param: string = "no";
    if (banned === true) param = "yes"; 
    return this.httpClient.post('http://localhost:8080/api/v1/admin/delete/' + id + "/" + param, null, this.httpOptions );
  }

  disableAlg(name: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    };
    return this.httpClient.post('http://localhost:8080/api/v1/admin/alg/disable/' + encodeURIComponent(name), null, this.httpOptions );
  }

  enableAlg(name: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    };
    return this.httpClient.post('http://localhost:8080/api/v1/admin/alg/enable/' + encodeURIComponent(name), null, this.httpOptions );
  }

  getAllImages(id: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    };
    return this.httpClient.get('http://localhost:8080/api/v1/admin/all/images/' + id, this.httpOptions );
  }

  getImage(id: number, rscId: number): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    };
    return this.httpClient.get('http://localhost:8080/api/v1/admin/image/' + id + "/" + rscId, this.httpOptions );
  }

  getAlgInfo(algName: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    };
    return this.httpClient.get('http://localhost:8080/api/v1/admin/alg/info/' + encodeURIComponent(algName), this.httpOptions );
  }
}
