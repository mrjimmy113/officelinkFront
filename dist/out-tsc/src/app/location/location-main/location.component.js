import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalService } from '../../service/modal.service';
import { LocationService } from '../../service/location.service';
import { LocationCreateComponent } from '../location-create/location-create.component';
var LocationComponent = /** @class */ (function () {
    function LocationComponent(modalService, service) {
        this.modalService = modalService;
        this.service = service;
        this.currentPage = 1;
        this.searchTerm = "";
    }
    LocationComponent.prototype.ngOnInit = function () {
        this.search("");
    };
    LocationComponent.prototype.search = function (value) {
        var _this = this;
        this.service.search(value).subscribe(function (result) {
            _this.maxPage = result.maxPage;
            _this.itemList = result.objList;
        });
    };
    LocationComponent.prototype.filter = function () {
        var _this = this;
        var newSearchTerm = this.searchTerm;
        setTimeout(function () {
            if (newSearchTerm == _this.searchTerm) {
                _this.search(_this.searchTerm);
            }
        }, 300);
    };
    LocationComponent.prototype.create = function () {
        var _this = this;
        this.modalService.init(LocationCreateComponent, [], function () { return _this.search(""); });
    };
    LocationComponent.prototype.edit = function (item) {
        var _this = this;
        this.modalService.init(LocationCreateComponent, item, function () { return _this.search(""); });
    };
    LocationComponent.prototype.delete = function (id) {
        var _this = this;
        this.service.delete(id).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("success");
                _this.search("");
            }
        });
    };
    LocationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-location',
            templateUrl: './location.component.html',
            styleUrls: ['./location.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, LocationService])
    ], LocationComponent);
    return LocationComponent;
}());
export { LocationComponent };
//# sourceMappingURL=location.component.js.map