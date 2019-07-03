import * as tslib_1 from "tslib";
import { Component, Input, Output } from "@angular/core";
import { Team } from "../model/team";
import { ModalService } from "../service/modal.service";
import { TeamService } from "../service/team.service";
import { DepartmentService } from "../service/department.service";
var TeamSaveComponent = /** @class */ (function () {
    function TeamSaveComponent(modalSer, teamSer, depSer) {
        this.modalSer = modalSer;
        this.teamSer = teamSer;
        this.depSer = depSer;
        this.isEdit = false;
        this.choosenDepId = 0;
    }
    TeamSaveComponent.prototype.ngOnInit = function () {
        this.init();
    };
    TeamSaveComponent.prototype.init = function () {
        // create new init modal
        if (this.inputs.length == 0) {
            this.team = new Team();
            this.getListDepartment();
        }
        else {
            // edit init modal
            this.team = this.inputs;
            this.choosenDepId = this.team.department.id;
            this.getListDepartment();
            this.isEdit = true;
        }
        this.requestStatus = 0;
    };
    TeamSaveComponent.prototype.closeModal = function () {
        this.modalSer.destroy();
    };
    // get list department and store in depList
    TeamSaveComponent.prototype.getListDepartment = function () {
        var _this = this;
        this.depSer.getAll().subscribe(function (result) {
            _this.depList = result;
        });
    };
    TeamSaveComponent.prototype.add = function () {
        var _this = this;
        this.getDepartment();
        this.teamSer.create(this.team).subscribe(function (result) {
            _this.requestStatus = result;
            alert("Create Successful");
            _this.closeModal();
            _this.outputs();
        }, function (error) {
            if (error.status == 409) {
                alert("Name cannot be duplicated");
            }
            else if ((error.status = 404)) {
                alert("Bad request");
            }
            _this.requestStatus = 0;
            _this.outputs();
        });
    };
    TeamSaveComponent.prototype.update = function () {
        var _this = this;
        this.getDepartment();
        this.teamSer.update(this.team).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("Update Successful");
                _this.closeModal();
            }
            _this.outputs();
        }, function (error) {
            if (error.status == 409) {
                alert("Name cannot be duplicated");
            }
            else if ((error.status = 404)) {
                alert("Bad request");
            }
            _this.requestStatus = 0;
            _this.outputs();
        });
    };
    TeamSaveComponent.prototype.save = function () {
        this.requestStatus = 1;
        if (this.isEdit)
            this.update();
        else
            this.add();
    };
    TeamSaveComponent.prototype.getDepartment = function () {
        var _this = this;
        if (this.choosenDepId == 0) {
            this.team.department = null;
        }
        else {
            this.depList.forEach(function (e) {
                if (e.id == _this.choosenDepId)
                    _this.team.department = e;
            });
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TeamSaveComponent.prototype, "inputs", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TeamSaveComponent.prototype, "outputs", void 0);
    TeamSaveComponent = tslib_1.__decorate([
        Component({
            selector: "app-team-save",
            templateUrl: "./team-save.component.html",
            styleUrls: ["./team-save.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService,
            TeamService,
            DepartmentService])
    ], TeamSaveComponent);
    return TeamSaveComponent;
}());
export { TeamSaveComponent };
//# sourceMappingURL=team-save.component.js.map