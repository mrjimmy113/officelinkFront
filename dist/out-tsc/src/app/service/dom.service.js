import * as tslib_1 from "tslib";
import { Injectable, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
var DomService = /** @class */ (function () {
    function DomService(componentFactoryResolver, appRef, injector) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.appRef = appRef;
        this.injector = injector;
    }
    DomService.prototype.appendComponentTo = function (parentId, child, childConfig) {
        // Create a component reference from the component 
        var childComponentRef = this.componentFactoryResolver
            .resolveComponentFactory(child)
            .create(this.injector);
        // Attach the config to the child (inputs and outputs)
        this.attachConfig(childConfig, childComponentRef);
        this.childComponentRef = childComponentRef;
        // Attach component to the appRef so that it's inside the ng component tree
        this.appRef.attachView(childComponentRef.hostView);
        // Get DOM element from component
        var childDomElem = childComponentRef.hostView
            .rootNodes[0];
        // Append DOM element to the body
        document.getElementById(parentId).appendChild(childDomElem);
    };
    DomService.prototype.removeComponent = function () {
        this.appRef.detachView(this.childComponentRef.hostView);
        this.childComponentRef.destroy();
    };
    DomService.prototype.attachConfig = function (config, componentRef) {
        var inputs = config.inputs;
        var outputs = config.outputs;
        // for (const key in inputs) {
        componentRef.instance['inputs'] = inputs;
        // }
        // for (const key in outputs) {
        componentRef.instance['outputs'] = outputs;
        // }
    };
    DomService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [ComponentFactoryResolver,
            ApplicationRef,
            Injector])
    ], DomService);
    return DomService;
}());
export { DomService };
//# sourceMappingURL=dom.service.js.map