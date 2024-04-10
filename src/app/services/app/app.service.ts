import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentExtractedResourceName: any;
  currentExtractedCollectionName: any;
  currentBytes: any;
  currentCollectionName: string = '';
  currentResourceName: string = '';
  deleteCollection: boolean = false;
  existsAnyColl: boolean = false;
  deleted: boolean = false;
  collDeleted: boolean = false;
  resLength: number = 0;

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

  setCurrentCollectionName(collectionName: string) {
    this.currentCollectionName = collectionName;
  }

  getCurrentCollectionName() {
    return this.currentCollectionName;
  }

  setCurrentResourceName(resourceName: string) {
    this.currentResourceName = resourceName;
  }

  getCurrentResourceName() {
    return this.currentResourceName;
  }

  setDeleteCollection(ok: boolean) {
    this.deleteCollection = ok;
  }

  getDeleteCollection() {
    return this.deleteCollection;
  }

  setExistsAnyCollection(ok: boolean) {
    this.existsAnyColl = ok;
  }

  getExistsAnyCollection() {
    return this.existsAnyColl;
  }

  setDeleted(ok: boolean) {
    this.deleted = ok;
  }

  getDeleted() {
    return this.deleted;
  }

  setCollDeleted(ok: boolean) {
    this.collDeleted = ok;
  }

  getCollDeleted() {
    return this.collDeleted;
  }

  setResLength(n: number) {
    this.resLength = n;
  }

  getResLength() {
    return this.resLength;
  }

}
