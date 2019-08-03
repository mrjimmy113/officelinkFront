import { Question } from './../../model/question';
import { ModalService } from 'src/app/service/modal.service';
import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  @Input() inputs;
  q:Question;
  constructor(private modalSer:ModalService) { }

  ngOnInit() {

    this.q = this.inputs;

  }

  closeModal() {
    this.modalSer.destroy();
  }

}
