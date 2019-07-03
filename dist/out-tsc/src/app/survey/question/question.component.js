import * as tslib_1 from "tslib";
import { AnswerOption } from './../../model/answerOption';
import { Question } from './../../model/question';
import { Component, Input, Output, EventEmitter } from '@angular/core';
var QuestionComponent = /** @class */ (function () {
    function QuestionComponent() {
        this.updateEditMode = new EventEmitter();
        this.giveClassToParent = new EventEmitter();
        this.copyQ = new EventEmitter();
        this.deleteQ = new EventEmitter();
        this.isEditMode = false;
    }
    QuestionComponent.prototype.ngOnInit = function () {
        this.question.options = new Array();
        console.log(this.updateEditMode);
        this.classToParent();
    };
    QuestionComponent.prototype.addOption = function () {
        this.question.options.push(new AnswerOption());
    };
    QuestionComponent.prototype.deleteOption = function (index) {
        this.question.options.splice(index, 1);
    };
    QuestionComponent.prototype.enableEditMode = function () {
        this.updateEditMode.emit();
        this.isEditMode = true;
    };
    QuestionComponent.prototype.classToParent = function () {
        this.giveClassToParent.emit(this);
    };
    QuestionComponent.prototype.disableEditMode = function () {
        this.isEditMode = false;
    };
    QuestionComponent.prototype.copyQuestion = function () {
        this.copyQ.emit(this.index);
    };
    QuestionComponent.prototype.deleteQuestion = function () {
        this.deleteQ.emit(this.index);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Question)
    ], QuestionComponent.prototype, "question", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], QuestionComponent.prototype, "index", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], QuestionComponent.prototype, "updateEditMode", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], QuestionComponent.prototype, "giveClassToParent", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], QuestionComponent.prototype, "copyQ", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], QuestionComponent.prototype, "deleteQ", void 0);
    QuestionComponent = tslib_1.__decorate([
        Component({
            selector: 'app-question',
            templateUrl: './question.component.html',
            styleUrls: ['./question.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], QuestionComponent);
    return QuestionComponent;
}());
export { QuestionComponent };
//# sourceMappingURL=question.component.js.map