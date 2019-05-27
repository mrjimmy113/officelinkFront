import { Component, OnInit } from '@angular/core';
import { NewDemoService } from '../service/new-demo.service';

@Component({
  selector: 'app-new-demo',
  templateUrl: './new-demo.component.html',
  styleUrls: ['./new-demo.component.css']
})
export class NewDemoComponent implements OnInit {

  constructor(private doSomething : NewDemoService) { }

  ngOnInit() {
    console.log("sad");
    this.doSomething.doSomething();
  }

}
