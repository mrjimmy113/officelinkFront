import { TypeEnum } from './../../model/typeEnum';
import { UltisService } from './../../service/ultis.service';
import { AnswerOption } from './../../model/answerOption';
import { AnswerReport } from './../../model/answerReport';
import { ReportService } from './../../service/report.service';
import { EventEmitter } from '@angular/core';
import { QuestionReport } from './../../model/questionReport';
import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-question-report',
  templateUrl: './question-report.component.html',
  styleUrls: ['./question-report.component.css']
})
export class QuestionReportComponent implements OnInit {
  @Input() question: QuestionReport;
  @Input() surveyId: number;
  @Input() locationId: number;
  @Input() departmentId: number;
  @Input() teamId : number;

  ratingOptionSet : AnswerOption[] = [
    {
      id : 1,
      answerText : '1'
    },
    {
      id : 2,
      answerText : '2'
    },
    {
      id : 3,
      answerText : '3'
    },
    {
      id : 4,
      answerText : '4'
    },
    {
      id : 5,
      answerText : '5'
    },
    {
      id : 6,
      answerText : '6'
    },
    {
      id : 7,
      answerText : '7'
    },
    {
      id : 8,
      answerText : '8'
    },
    {
      id : 9,
      answerText : '9'
    },
    {
      id : 10,
      answerText : '10'
    }
  ]

  isOpen = false;
  typeEnum = TypeEnum;
  constructor(private reportSer: ReportService, private utltis:UltisService) { }

  ngOnInit() {

  }

  openDetail() {
    this.isOpen = true;
    if(this.question.answers == null) {
      this.reportSer.getCompareQuestionAnswer(this.surveyId,this.question.question.id,this.locationId,this.departmentId,this.teamId).subscribe(result => {
        this.question.answers = result;
        if(this.question.question.type.type == 'RATE') {
          this.question.reportData = this.getChartParam(result,this.ratingOptionSet);
        }
      })
    }
  }

  closeDetail() {
    this.isOpen =false;
  }
  getChartParam(
    answers: AnswerReport[],
    answerTexts: AnswerOption[]
  ): NgxChartParam[] {
    let dataList = new Array<NgxChartParam>();
    answerTexts.forEach(element => {
      let data: NgxChartParam = {
        name: element.answerText.toString(),
        value: this.getOptionValue(element.id.valueOf(), answers)
      };
      dataList.push(data);
    });
    dataList.sort(this.utltis.sortByPropertyNameDSC("name"));
    dataList.sort(this.utltis.sortByPropertyNameDSC("value"));
    return dataList;
  }

  getOptionValue(id: number, answers: AnswerReport[]): number {
    for (let index = 0; index < answers.length; index++) {
      if (Number(answers[index].term).valueOf() == id) {
        return answers[index].weight.valueOf();
      }
    }

    return 0;
  }

}
interface NgxChartParam {
  name: string;
  value: number;
}
