import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentExtractedResourceName: any;
  currentExtractedCollectionName: any;
  currentBytes: any;

  constructor() { }

  setCurrentExtractedResourceName(name: string | null) {
    this.currentExtractedResourceName = name;
  }

  getCurrentExtractedResourceName() {
    return this.currentExtractedResourceName;
  }

  setCurrentExtractedCollectionName(name: string | null) {
    this.currentExtractedCollectionName = name;
  }

  getCurrentExtractedCollectionName() {
    return this.currentExtractedCollectionName;
  }

  setCurrentBytes(bytes: any) {
    this.currentBytes = bytes;
  }

  getCurrentBytes() {
    return this.currentBytes;
  }

}
