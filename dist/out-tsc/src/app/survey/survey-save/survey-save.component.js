import * as tslib_1 from "tslib";
import { Question } from './../../model/question';
import { Component } from '@angular/core';
var SurveySaveComponent = /** @class */ (function () {
    function SurveySaveComponent() {
    }
    SurveySaveComponent.prototype.ngOnInit = function () {
        this.questionList = new Array();
        this.qComponentList = new Array();
    };
    SurveySaveComponent.prototype.updateEditMode = function () {
        this.qComponentList.forEach(function (element) {
            element.disableEditMode();
        });
    };
    SurveySaveComponent.prototype.getChildInfor = function (infor) {
        this.qComponentList.push(infor);
    };
    SurveySaveComponent.prototype.addQuestion = function () {
        this.questionList.push(new Question());
    };
    SurveySaveComponent.prototype.copyQ = function (index) {
        var tmpQ = this.questionList[index];
        this.questionList.push(tmpQ);
    };
    SurveySaveComponent.prototype.deleteQ = function (index) {
        this.questionList.splice(index, 1);
        this.qComponentList.splice(index, 1);
    };
    SurveySaveComponent = tslib_1.__decorate([
        Component({
            selector: 'app-survey-save',
            templateUrl: './survey-save.component.html',
            styleUrls: ['./survey-save.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], SurveySaveComponent);
    return SurveySaveComponent;
}());
export { SurveySaveComponent };
//# sourceMappingURL=survey-save.component.js.map