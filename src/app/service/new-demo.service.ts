import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewDemoService {

  constructor() { }
  
  doSomething() {
    alert("abc");
  }
  clmn() {
    console.log("cl");
  }
}
