import * as tslib_1 from "tslib";
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
var SurveyService = /** @class */ (function () {
    function SurveyService(http) {
        this.http = http;
        this.api = environment.apiEndPoint + "/survey";
    }
    SurveyService.prototype.create = function (survey) {
        return this.http.post(this.api, survey);
    };
    SurveyService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], SurveyService);
    return SurveyService;
}());
export { SurveyService };
//# sourceMappingURL=survey.service.js.map