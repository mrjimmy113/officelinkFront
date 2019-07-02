import * as tslib_1 from "tslib";
import { Component, Input, Output } from '@angular/core';
import { News } from 'src/app/model/news';
import { ModalService } from 'src/app/service/modal.service';
import { NewsService } from 'src/app/service/news.service';
var NewsCreateComponent = /** @class */ (function () {
    function NewsCreateComponent(modalService, service) {
        this.modalService = modalService;
        this.service = service;
        this.isEdit = false;
    }
    NewsCreateComponent.prototype.ngOnInit = function () {
        this.init();
    };
    NewsCreateComponent.prototype.init = function () {
        if (this.inputs.length == 0) {
            this.news = new News();
        }
        else {
            this.news = this.inputs;
            this.isEdit = true;
        }
        this.requestStatus = 0;
    };
    NewsCreateComponent.prototype.close = function () {
        this.modalService.destroy();
    };
    NewsCreateComponent.prototype.add = function () {
        var _this = this;
        this.service.create(this.news).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 201) {
                alert("Create Successful");
                _this.close();
            }
            _this.outputs();
        }, function (error) {
            if (error.status == 409) {
                alert("Title cannot be duplicated");
            }
            else if (error.status = 404) {
                alert("Bad request");
            }
            _this.close();
            _this.outputs();
        });
    };
    NewsCreateComponent.prototype.update = function () {
        var _this = this;
        this.service.update(this.news).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("Update Successful");
                _this.close();
            }
            _this.outputs();
        });
    };
    NewsCreateComponent.prototype.save = function () {
        this.requestStatus = 1;
        if (this.isEdit)
            this.update();
        else
            this.add();
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], NewsCreateComponent.prototype, "inputs", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], NewsCreateComponent.prototype, "outputs", void 0);
    NewsCreateComponent = tslib_1.__decorate([
        Component({
            selector: 'app-news-create',
            templateUrl: './news-create.component.html',
            styleUrls: ['./news-create.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, NewsService])
    ], NewsCreateComponent);
    return NewsCreateComponent;
}());
export { NewsCreateComponent };
//# sourceMappingURL=news-create.component.js.map