import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostResource } from 'src/app/interfaces/post-resource';
import { StorageService } from '../storage/storage.service';
import { UpdateResource } from 'src/app/interfaces/updateResource';

const USER_API = 'http://${BACKEND_CONTAINER}/api/v1/user/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

}

