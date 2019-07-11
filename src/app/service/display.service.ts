import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private loaderID = 'loader';
  constructor() { }

  showLoader() {
    document.getElementById(this.loaderID).className = 'show';
  }
  hideLoader() {
    document.getElementById(this.loaderID).className = 'hidden';
  }
}
