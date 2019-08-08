import { SurveyService } from './../../service/survey.service';
import { ModalService } from 'src/app/service/modal.service';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Survey } from 'src/app/model/survey';

@Component({
  selector: 'app-survey-detail',
  templateUrl: './survey-detail.component.html',
  styleUrls: ['./survey-detail.component.css']
})
export class SurveyDetailComponent implements OnInit {
  @Input() inputs;
  @Output() outputs;
  survey :Survey;
  constructor(private modalSer:ModalService, private surveySer:SurveyService) { }

  ngOnInit() {
    this.survey = this.inputs;
    this.surveySer.getDetail(this.survey.id).subscribe(result => {
      this.survey.questions = result;
    })
  }

  closeModal() {
    this.modalSer.destroy();
  }
  useTemplate() {
    this.outputs();
    this.closeModal();
  }

}
