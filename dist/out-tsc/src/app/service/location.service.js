import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
var LocationService = /** @class */ (function () {
    function LocationService(http) {
        this.http = http;
        this.api = environment.apiEndPoint + "/location";
    }
    LocationService.prototype.search = function (term) {
        return this.http.get(this.api + ("?term=" + term));
    };
    LocationService.prototype.getPage = function (term, page) {
        return this.http.get(this.api + ("?term=" + term + "&page=" + page));
    };
    LocationService.prototype.create = function (obj) {
        return this.http.post(this.api, obj);
    };
    LocationService.prototype.update = function (obj) {
        return this.http.put(this.api, obj);
    };
    LocationService.prototype.delete = function (id) {
        return this.http.delete(this.api + ("?id=" + id));
    };
    LocationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], LocationService);
    return LocationService;
}());
export { LocationService };
//# sourceMappingURL=location.service.js.map