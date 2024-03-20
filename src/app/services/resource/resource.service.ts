import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { PostResource } from 'src/app/interfaces/post-resource';
import { UpdateResource } from 'src/app/interfaces/updateResource';


const RESOURCE_API = 'http://localhost:8080/api/v1/resource/';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

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
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get('http://localhost:8080/api/v1/collection' + '?collectionName=' + encodeURIComponent(collectionName || "null"), this.httpOptions );
  }

  getAllCollections(): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get('http://localhost:8080/api/v1/collection/' + 'all', this.httpOptions);
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
    return this.httpClient.post(RESOURCE_API + 'upload', postResource, this.httpOptions);
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
    return this.httpClient.get(RESOURCE_API + 'extract?collectionName=' + encodeURIComponent(collectionName) + '&' + "resourceName=" + encodeURIComponent(resourceName), this.httpOptions);
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
    return this.httpClient.get(RESOURCE_API + 'info?collectionName=' + encodeURIComponent(collectionName) + '&resourceName=' + encodeURIComponent(resourceName), this.httpOptions);
  }

  updateResource(updateResource: UpdateResource): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.patch(RESOURCE_API + 'update', updateResource, this.httpOptions);
  }

  saveResource(): Observable<any>  {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.patch(RESOURCE_API + 'save', null, this.httpOptions);  
  }
}
