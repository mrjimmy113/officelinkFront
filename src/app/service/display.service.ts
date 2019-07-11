import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private loaderID = 'loader';
  constructor() { }

  show() {
    document.getElementById(this.loaderID).className = 'show';
  }
  hide() {
    document.getElementById(this.loaderID).className = 'hidden';
  }
}
