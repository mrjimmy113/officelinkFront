import * as tslib_1 from "tslib";
import { Component, Input, Output } from '@angular/core';
import { Department } from '../model/department';
import { ModalService } from '../service/modal.service';
import { DepartmentService } from '../service/department.service';
var DepartmentSaveComponent = /** @class */ (function () {
    function DepartmentSaveComponent(modalSer, ser) {
        this.modalSer = modalSer;
        this.ser = ser;
        this.isEdit = false;
    }
    DepartmentSaveComponent.prototype.ngOnInit = function () {
        this.init();
    };
    DepartmentSaveComponent.prototype.init = function () {
        if (this.inputs.length == 0) {
            this.department = new Department();
        }
        else {
            this.department = this.inputs;
            this.getDepartment(this.department.id);
            this.isEdit = true;
        }
        this.requestStatus = 0;
    };
    DepartmentSaveComponent.prototype.closeModal = function () {
        this.modalSer.destroy();
    };
    DepartmentSaveComponent.prototype.add = function () {
        var _this = this;
        this.ser.create(this.department).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 201) {
                alert("Create Successful");
                _this.closeModal();
            }
            _this.outputs();
        }, function (error) {
            if (error.status == 409) {
                alert("Name cannot be duplicated");
            }
            else if (error.status = 400) {
                alert("Bad request");
            }
            _this.closeModal();
            _this.outputs();
        });
    };
    DepartmentSaveComponent.prototype.update = function () {
        var _this = this;
        this.ser.update(this.department).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("Update Successful");
                _this.closeModal();
            }
            _this.outputs();
        }, function (error) {
            if (_this.requestStatus == 400)
                alert("Bad request");
            _this.requestStatus = 0;
        });
    };
    DepartmentSaveComponent.prototype.save = function () {
        this.requestStatus = 1;
        if (this.isEdit)
            this.update();
        else
            this.add();
    };
    DepartmentSaveComponent.prototype.getDepartment = function (depId) {
        var _this = this;
        this.ser.getDepartmentWithTeams(depId).subscribe(function (result) {
            _this.department = result;
            console.log(_this.department);
        }, function (error) {
            alert("Something went wrong. Try again later.");
            _this.closeModal();
        });
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], DepartmentSaveComponent.prototype, "inputs", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], DepartmentSaveComponent.prototype, "outputs", void 0);
    DepartmentSaveComponent = tslib_1.__decorate([
        Component({
            selector: 'app-department-save',
            templateUrl: './department-save.component.html',
            styleUrls: ['./department-save.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, DepartmentService])
    ], DepartmentSaveComponent);
    return DepartmentSaveComponent;
}());
export { DepartmentSaveComponent };
//# sourceMappingURL=department-save.component.js.map