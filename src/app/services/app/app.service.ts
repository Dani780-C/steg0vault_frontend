import { Injectable } from '@angular/core';
import { CollectionResources } from '../../interfaces/collection-resources';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  currentExtractedResourceName: any;
  currentExtractedCollectionName: any;
  currentBytes: any;
  currentCollectionName: string = '';
  currentCollectionDescription: string = '';
  currentResourceName: string = '';
  deleteCollection: boolean = false;
  existsAnyColl: boolean = false;
  deleted: boolean = false;
  collDeleted: boolean = false;
  resLength: number = 0;
  collectionResources: CollectionResources[] = new Array();
  userId: number = 0;
  userToBeDeleted: string = '';
  algName: string = '';
  str: string = '';

  constructor() { }

  setCurrentExtractedResourceName(name: string | null) {
    this.currentExtractedResourceName = name;
  }

  getCurrentExtractedResourceName() {
    return this.currentExtractedResourceName;
  }

  setSeeMoreStr(str: string) {
    this.str = str;
  }

  getSeeMoreStr() {
    return this.str;
  }

  setAlgName(name: string) {
    this.algName = name;
  }

  getAlgName() {
    return this.algName;
  }

  setUserToBeDeleted(email: string) {
    this.userToBeDeleted = email;
  }

  getUserToBeDeleted() {
    return this.userToBeDeleted;
  }

  setCurrentExtractedCollectionName(name: string | null) {
    this.currentExtractedCollectionName = name;
  }

  getCurrentExtractedCollectionName() {
    return this.currentExtractedCollectionName;
  }

  setUserId(id: number) {
    this.userId = id;
  }

  getUserId() {
    return this.userId;
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

  setCurrentCollectionDescription(collDescr: string) {
    this.currentCollectionDescription = collDescr;
  }

  getCurrentCollectionName() {
    return this.currentCollectionName;
  }

  getCurrentCollectionDescription() {
    return this.currentCollectionDescription;
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

  setAllCollections(collections: CollectionResources[]) {
    this.collectionResources = collections;
  }

  getAllCollections() {
    return this.collectionResources;
  }

}
