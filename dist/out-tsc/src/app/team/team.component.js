import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { TeamService } from '../service/team.service';
import { TeamSaveComponent } from '../team-save/team-save.component';
var TeamComponent = /** @class */ (function () {
    function TeamComponent(modalSer, ser) {
        this.modalSer = modalSer;
        this.ser = ser;
        this.currentPage = 1;
        this.searchTerm = "";
    }
    TeamComponent.prototype.ngOnInit = function () {
        this.search("");
    };
    TeamComponent.prototype.search = function (value) {
        var _this = this;
        this.ser.search(value).subscribe(function (result) {
            _this.maxPage = result.maxPage;
            _this.itemList = result.objList;
        });
    };
    TeamComponent.prototype.openCreate = function () {
        var _this = this;
        this.modalSer.init(TeamSaveComponent, [], function () { return _this.search(""); });
    };
    TeamComponent.prototype.openEdit = function (item) {
        var _this = this;
        this.modalSer.init(TeamSaveComponent, item, function () { return _this.search(""); });
    };
    TeamComponent.prototype.filter = function () {
        var _this = this;
        var newSearchTerm = this.searchTerm;
        setTimeout(function () {
            if (newSearchTerm == _this.searchTerm) {
                _this.search(_this.searchTerm);
            }
        }, 300);
    };
    TeamComponent.prototype.delete = function (id) {
        var _this = this;
        this.ser.delete(id).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("success");
                _this.search("");
            }
        });
    };
    TeamComponent = tslib_1.__decorate([
        Component({
            selector: 'app-team',
            templateUrl: './team.component.html',
            styleUrls: ['./team.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, TeamService])
    ], TeamComponent);
    return TeamComponent;
}());
export { TeamComponent };
//# sourceMappingURL=team.component.js.map