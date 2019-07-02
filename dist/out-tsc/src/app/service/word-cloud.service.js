import * as tslib_1 from "tslib";
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var WordCloudService = /** @class */ (function () {
    function WordCloudService(http) {
        this.http = http;
        this.api = environment.apiEndPoint + "/wordCloud";
    }
    WordCloudService.prototype.search = function (term) {
        return this.http.get(this.api + ("?term=" + term));
    };
    WordCloudService.prototype.getPage = function (term, page) {
        return this.http.get(this.api + ("?term=" + term + "&page=" + page));
    };
    WordCloudService.prototype.create = function (obj) {
        return this.http.post(this.api, obj);
    };
    WordCloudService.prototype.update = function (obj) {
        return this.http.put(this.api, obj);
    };
    WordCloudService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], WordCloudService);
    return WordCloudService;
}());
export { WordCloudService };
//# sourceMappingURL=word-cloud.service.js.map