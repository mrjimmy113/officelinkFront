import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
var TeamService = /** @class */ (function () {
    function TeamService(http) {
        this.http = http;
        this.api = environment.apiEndPoint + "/team";
    }
    TeamService.prototype.search = function (term) {
        return this.http.get(this.api + ("?term=" + term));
    };
    TeamService.prototype.getPage = function (term, page) {
        return this.http.get(this.api + ("?term=" + term + "&page=" + page));
    };
    TeamService.prototype.create = function (obj) {
        return this.http.post(this.api, obj);
    };
    TeamService.prototype.update = function (obj) {
        return this.http.put(this.api, obj);
    };
    TeamService.prototype.delete = function (id) {
        return this.http.delete(this.api + ("?id=" + id));
    };
    TeamService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], TeamService);
    return TeamService;
}());
export { TeamService };
//# sourceMappingURL=team.service.js.map