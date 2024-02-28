import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs/internal/Observable';


const RESOURCE_API = 'http://localhost:8080/api/resource/';

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

  getImageBytes(collectionName: string, resourceName: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get(RESOURCE_API + 'get-bytes/' + collectionName + "/" + resourceName, this.httpOptions );
  }

  getCollectionAnd3Resources(collectionName: string | null, rscs: string[]): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.get(RESOURCE_API + "get/" + collectionName + "/?resources=" + rscs, this.httpOptions );
  
  }
}
