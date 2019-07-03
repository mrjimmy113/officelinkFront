import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DomService } from './dom.service';
var ModalService = /** @class */ (function () {
    function ModalService(domService) {
        this.domService = domService;
        this.modalElementId = 'modal-container';
        this.overlayElementId = 'overlay';
    }
    ModalService.prototype.init = function (component, inputs, outputs) {
        var componentConfig = {
            inputs: inputs,
            outputs: outputs
        };
        this.domService.appendComponentTo(this.modalElementId, component, componentConfig);
        document.getElementById(this.modalElementId).className = 'show';
        document.getElementById(this.overlayElementId).className = 'show';
    };
    ModalService.prototype.destroy = function () {
        this.domService.removeComponent();
        document.getElementById(this.modalElementId).className = 'hidden';
        document.getElementById(this.overlayElementId).className = 'hidden';
    };
    ModalService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [DomService])
    ], ModalService);
    return ModalService;
}());
export { ModalService };
//# sourceMappingURL=modal.service.js.map