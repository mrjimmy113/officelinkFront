import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
var DepartmentService = /** @class */ (function () {
    function DepartmentService(http) {
        this.http = http;
        this.api = environment.apiEndPoint + "/department";
    }
    DepartmentService.prototype.getDepartmentWithTeams = function (depId) {
        return this.http.get(this.api + "/getDep" + ("?depId=" + depId));
    };
    DepartmentService.prototype.getAll = function () {
        return this.http.get(this.api + "/getAll");
    };
    DepartmentService.prototype.search = function (term) {
        return this.http.get(this.api + ("?term=" + term));
    };
    DepartmentService.prototype.getPage = function (term, page) {
        return this.http.get(this.api + ("?term=" + term + "&page=" + page));
    };
    DepartmentService.prototype.create = function (obj) {
        return this.http.post(this.api, obj);
    };
    DepartmentService.prototype.update = function (obj) {
        return this.http.put(this.api, obj);
    };
    DepartmentService.prototype.delete = function (id) {
        return this.http.delete(this.api + ("?id=" + id));
    };
    DepartmentService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], DepartmentService);
    return DepartmentService;
}());
export { DepartmentService };
//# sourceMappingURL=department.service.js.map