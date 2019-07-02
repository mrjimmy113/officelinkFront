import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
var NewsService = /** @class */ (function () {
    function NewsService(http) {
        this.http = http;
        this.api = environment.apiEndPoint + "/news";
    }
    NewsService.prototype.search = function (term) {
        return this.http.get(this.api + ("?term=" + term));
    };
    NewsService.prototype.getPage = function (term, page) {
        return this.http.get(this.api + ("?term=" + term + "&page=" + page));
    };
    NewsService.prototype.create = function (obj) {
        return this.http.post(this.api, obj);
    };
    NewsService.prototype.update = function (obj) {
        return this.http.put(this.api, obj);
    };
    NewsService.prototype.delete = function (id) {
        return this.http.delete(this.api + ("?id=" + id));
    };
    NewsService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], NewsService);
    return NewsService;
}());
export { NewsService };
//# sourceMappingURL=news.service.js.map