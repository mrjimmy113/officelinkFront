import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { DepartmentService } from '../service/department.service';
import { DepartmentSaveComponent } from '../department-save/department-save.component';
var DepartmentComponent = /** @class */ (function () {
    function DepartmentComponent(modalSer, ser) {
        this.modalSer = modalSer;
        this.ser = ser;
        this.currentPage = 1;
        this.searchTerm = "";
    }
    DepartmentComponent.prototype.ngOnInit = function () {
        this.search("");
    };
    DepartmentComponent.prototype.search = function (value) {
        var _this = this;
        this.ser.search(value).subscribe(function (result) {
            _this.maxPage = result.maxPage;
            _this.itemList = result.objList;
        });
    };
    DepartmentComponent.prototype.openCreate = function () {
        var _this = this;
        this.modalSer.init(DepartmentSaveComponent, [], function () { return _this.search(""); });
    };
    DepartmentComponent.prototype.openEdit = function (item) {
        var _this = this;
        this.modalSer.init(DepartmentSaveComponent, item, function () { return _this.search(""); });
    };
    DepartmentComponent.prototype.filter = function () {
        var _this = this;
        var newSearchTerm = this.searchTerm;
        setTimeout(function () {
            if (newSearchTerm == _this.searchTerm) {
                _this.search(_this.searchTerm);
            }
        }, 300);
    };
    DepartmentComponent.prototype.delete = function (id) {
        var _this = this;
        this.ser.delete(id).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("Success");
                _this.search("");
            }
        });
    };
    DepartmentComponent = tslib_1.__decorate([
        Component({
            selector: 'app-department',
            templateUrl: './department.component.html',
            styleUrls: ['./department.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, DepartmentService])
    ], DepartmentComponent);
    return DepartmentComponent;
}());
export { DepartmentComponent };
//# sourceMappingURL=department.component.js.map