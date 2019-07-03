import * as tslib_1 from "tslib";
import { Question } from './../../model/question';
import { Component } from '@angular/core';
import { Survey } from 'src/app/model/survey';
var SurveyTakeComponent = /** @class */ (function () {
    function SurveyTakeComponent() {
    }
    SurveyTakeComponent.prototype.ngOnInit = function () {
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
    SurveyTakeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-survey-take',
            templateUrl: './survey-take.component.html',
            styleUrls: ['./survey-take.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SurveyTakeComponent);
    return SurveyTakeComponent;
}());
export { SurveyTakeComponent };
//# sourceMappingURL=survey-take.component.js.map