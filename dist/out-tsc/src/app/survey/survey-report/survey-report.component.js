import * as tslib_1 from "tslib";
import { SurveyCompareComponent } from './../survey-compare/survey-compare.component';
import { ModalService } from './../../service/modal.service';
import { Question } from './../../model/question';
import { Component } from '@angular/core';
import { Survey } from 'src/app/model/survey';
var SurveyReportComponent = /** @class */ (function () {
    function SurveyReportComponent(modalSer) {
        this.modalSer = modalSer;
        this.doughnutChartLabels = ["Wonderful", "Good", "Not Bad", "Bad", "Unacceptable"];
        this.doughnutChartData = [
            [50, 20, 10, 10, 10],
        ];
        this.doughnutChartType = 'doughnut';
    }
    SurveyReportComponent.prototype.ngOnInit = function () {
        this.survey = new Survey();
        this.survey.name = "Experience of the new Cafeteria";
        this.survey.questions = new Array();
        var q = new Question();
        q.question = "How you rate the services ?";
        this.survey.questions.push(q);
        this.survey.questions.push(q);
        this.survey.questions.push(q);
        this.survey.questions.push(q);
    };
    SurveyReportComponent.prototype.openCompare = function () {
        this.modalSer.init(SurveyCompareComponent, [], []);
    };
    SurveyReportComponent = tslib_1.__decorate([
        Component({
            selector: 'app-survey-report',
            templateUrl: './survey-report.component.html',
            styleUrls: ['./survey-report.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService])
    ], SurveyReportComponent);
    return SurveyReportComponent;
}());
export { SurveyReportComponent };
//# sourceMappingURL=survey-report.component.js.map