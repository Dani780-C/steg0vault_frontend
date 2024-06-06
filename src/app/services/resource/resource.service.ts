import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { PostResource } from 'src/app/interfaces/post-resource';
import { UpdateResource } from 'src/app/interfaces/updateResource';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  httpOptions: any;
  
  private readonly RESOURCE_API: string = environment.API_BASE_URL + 'resource/'; 

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
    return this.httpClient.post(this.RESOURCE_API + 'upload', postResource, this.httpOptions);
  }

  tryToExtract(postResource: PostResource): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.post(this.RESOURCE_API + 'try-to-extract', postResource, this.httpOptions);
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
    return this.httpClient.get(this.RESOURCE_API + 'extract?collectionName=' + encodeURIComponent(collectionName) + '&' + "resourceName=" + encodeURIComponent(resourceName), this.httpOptions);
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
    return this.httpClient.get(this.RESOURCE_API + 'info?collectionName=' + encodeURIComponent(collectionName) + '&' + "resourceName=" + encodeURIComponent(resourceName), this.httpOptions);
  }

  updateResource(collName: string, resName: string, updateResource: UpdateResource): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.patch(this.RESOURCE_API + 'update?collectionName=' + collName + '&resourceName=' + resName, updateResource, this.httpOptions);
  }

  saveResource(collectionName: string, resourceName: string): Observable<any>  {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.patch(this.RESOURCE_API + 'save?collectionName=' + encodeURIComponent(collectionName) + '&resourceName=' + encodeURIComponent(resourceName), null, this.httpOptions);  
  }

  deleteResource(collName: string, resName: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.delete(this.RESOURCE_API + 'delete?collectionName=' + encodeURIComponent(collName) + '&resourceName=' + encodeURIComponent(resName), this.httpOptions);  
  }

  deleteCollection(collName: string): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders(
        { 
          'Authorization': 'Bearer ' + this.storageService.getToken(), 
          'Content-Type': 'application/json'
        }
      )
    }; 
    return this.httpClient.delete(this.RESOURCE_API + 'delete-coll?collectionName=' + encodeURIComponent(collName), this.httpOptions);  
  }
}
