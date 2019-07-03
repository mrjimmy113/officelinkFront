import * as tslib_1 from "tslib";
import { Component, Input, Output } from '@angular/core';
import { Location } from '../../model/location';
import { ModalService } from '../../service/modal.service';
import { LocationService } from '../../service/location.service';
var LocationCreateComponent = /** @class */ (function () {
    function LocationCreateComponent(modalService, service) {
        this.modalService = modalService;
        this.service = service;
        this.isEdit = false;
    }
    LocationCreateComponent.prototype.ngOnInit = function () {
        this.init();
    };
    LocationCreateComponent.prototype.init = function () {
        if (this.inputs.length == 0) {
            this.location = new Location();
        }
        else {
            this.location = this.inputs;
            this.isEdit = true;
        }
        this.requestStatus = 0;
    };
    LocationCreateComponent.prototype.close = function () {
        this.modalService.destroy();
    };
    LocationCreateComponent.prototype.add = function () {
        var _this = this;
        this.service.create(this.location).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 201) {
                alert("Create Successful");
                _this.close();
            }
            _this.outputs();
        }, function (error) {
            if (error.status == 409) {
                alert("Address cannot be duplicated");
            }
            else if (error.status = 404) {
                alert("Bad request");
            }
            _this.close();
            _this.outputs();
        });
    };
    LocationCreateComponent.prototype.update = function () {
        var _this = this;
        this.service.update(this.location).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("Update Successful");
                _this.close();
            }
            _this.outputs();
        });
    };
    LocationCreateComponent.prototype.save = function () {
        this.requestStatus = 1;
        if (this.isEdit)
            this.update();
        else
            this.add();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], LocationCreateComponent.prototype, "inputs", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], LocationCreateComponent.prototype, "outputs", void 0);
    LocationCreateComponent = tslib_1.__decorate([
        Component({
            selector: 'app-location-create',
            templateUrl: './location-create.component.html',
            styleUrls: ['./location-create.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, LocationService])
    ], LocationCreateComponent);
    return LocationCreateComponent;
}());
export { LocationCreateComponent };
//# sourceMappingURL=location-create.component.js.map