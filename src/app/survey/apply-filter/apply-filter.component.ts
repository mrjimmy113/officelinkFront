import { CloudData } from 'angular-tag-cloud-module';
import { AnswerReport } from './../../model/answerReport';
import { WordCloudService } from 'src/app/service/word-cloud.service';
import { WordCloudFilter } from './../../model/word-cloud-filter';
import { QuestionReport } from './../../model/questionReport';
import { ModalService } from 'src/app/service/modal.service';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apply-filter',
  templateUrl: './apply-filter.component.html',
  styleUrls: ['./apply-filter.component.css']
})
export class ApplyFilterComponent implements OnInit {
  @Input() inputs;
  constructor(private modalSer:ModalService, private filterSer:WordCloudService) { }
  question : QuestionReport;
  filterList : Array<WordCloudFilter>;
  choosenFilters : Array<WordCloudFilter>;
  wordCloudData : Array<CloudData[]>;
  ngOnInit() {
    this.question = this.inputs;
    this.wordCloudData = new Array();
    this.wordCloudData.push(this.getWordCloud(this.question.answers));
    this.filterSer.getAll().subscribe(result => {
      this.filterList = result;
    })
  }

  closeModal() {
    if(confirm("Do you want to close this dialog ?")) {
      this.modalSer.destroy();
    }
  }

  removeFilter(index) {

  }

  getWordCloud(answers: Array<AnswerReport>): CloudData[] {
    let dataList = new Array<CloudData>();
    answers.forEach(element => {
      let data: CloudData = {
        text: element.term.toString(),
        weight: element.weight.valueOf(),
        color: "#" + (((1 << 24) * Math.random()) | 0).toString(16)
      };
      dataList.push(data);
    });
    return dataList;
  }

}
