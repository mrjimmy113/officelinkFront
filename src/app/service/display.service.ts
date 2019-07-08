import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  menu = true;
  constructor() { }

  showMenu() {
    this.menu = true;
  }

  hideMenu() {
    this.menu = false;
  }

  statusMenu() : boolean {
    return this.menu;
  }
}
