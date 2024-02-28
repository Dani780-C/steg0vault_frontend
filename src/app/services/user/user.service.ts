import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResource } from 'src/app/interfaces/post-resource';
import { StorageService } from '../storage/storage.service';

const USER_API = 'http://localhost:8080/api/user/';

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

  getCollectionByName(collectionName: string | null): Observable<any> {
    // console.log("Get collection by name");
    // console.log(this.storageService.getToken());
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get(USER_API + 'collection/' + collectionName, this.httpOptions );
  }

  

  getAllCollections(): Observable<any> {
    // console.log("Get all collections");
    // console.log(this.storageService.getToken());
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get(USER_API + 'all/collection', this.httpOptions);
  }

  postResource(postResource: PostResource): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.post(USER_API + 'upload-resource', postResource, this.httpOptions);
  }

  getResourceByName(resourceName: string, collectionName: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get(USER_API + 'get-resource/' + collectionName + '/' + resourceName, this.httpOptions);
  }

  getResourceInfo(resourceName: string, collectionName: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get(USER_API + 'get-resource-info/' + collectionName + '/' + resourceName, this.httpOptions);
  }

}

