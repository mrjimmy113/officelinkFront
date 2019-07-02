import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
var InvitationComponent = /** @class */ (function () {
    function InvitationComponent() {
    }
    InvitationComponent.prototype.ngOnInit = function () {
        this.listEmail = new Array();
    };
    InvitationComponent.prototype.addNewEmail = function () {
        this.listEmail.push(this.newEmail);
        this.newEmail = "";
    };
    InvitationComponent.prototype.removeEmail = function (index) {
        this.listEmail.splice(index, 1);
    };
    InvitationComponent = tslib_1.__decorate([
        Component({
            selector: 'app-invitation',
            templateUrl: './invitation.component.html',
            styleUrls: ['./invitation.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], InvitationComponent);
    return InvitationComponent;
}());
export { InvitationComponent };
//# sourceMappingURL=invitation.component.js.map