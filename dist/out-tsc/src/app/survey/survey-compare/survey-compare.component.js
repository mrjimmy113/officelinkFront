import * as tslib_1 from "tslib";
import { ModalService } from './../../service/modal.service';
import { Component } from '@angular/core';
var SurveyCompareComponent = /** @class */ (function () {
    function SurveyCompareComponent(modalSer) {
        this.modalSer = modalSer;
        this.lineChartData = [
            { data: [60], label: 'Wonderful' },
            { data: [30], label: 'Good' },
            { data: [5], label: 'Not bad' },
            { data: [3], label: 'Bad' },
            { data: [2], label: 'Unacceptable' },
        ];
        this.lineChartLabels = ['Survey 1'];
        this.lineChartType = 'line';
    }
    SurveyCompareComponent.prototype.ngOnInit = function () {
        this.listEmail = new Array();
    };
    SurveyCompareComponent.prototype.addNewEmail = function () {
        this.lineChartLabels.push('Survey 2');
        this.lineChartData[0].data = [60, 50];
        this.lineChartData[1].data = [30, 25];
        this.lineChartData[2].data = [5, 15];
        this.lineChartData[3].data = [3, 6];
        this.lineChartData[4].data = [2, 4];
        this.listEmail.push(this.newEmail);
        this.newEmail = "";
    };
    SurveyCompareComponent.prototype.removeEmail = function (index) {
        this.listEmail.splice(index, 1);
    };
    SurveyCompareComponent.prototype.closeModal = function () {
        this.modalSer.destroy();
    };
    SurveyCompareComponent = tslib_1.__decorate([
        Component({
            selector: 'app-survey-compare',
            templateUrl: './survey-compare.component.html',
            styleUrls: ['./survey-compare.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService])
    ], SurveyCompareComponent);
    return SurveyCompareComponent;
}());
export { SurveyCompareComponent };
//# sourceMappingURL=survey-compare.component.js.map