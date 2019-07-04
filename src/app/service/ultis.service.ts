import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UltisService {

  constructor() { }
  sortByPropertyNameASC(name) {
    return function(a,b) {
      if ( a[name] < b[name] ){
        return -1;
      }
      if ( a[name] > b[name] ){
        return 1;
      }
      return 0;
    }
  }
  sortByPropertyNameDSC(name) {
    return function(a,b) {
      if ( a[name] < b[name] ){
        return 1;
      }
      if ( a[name] > b[name] ){
        return -1;
      }
      return 0;
    }
  }
}
