import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';
import { NewsService } from 'src/app/service/news.service';
import { NewsCreateComponent } from '../news-create/news-create.component';
var NewsMainComponent = /** @class */ (function () {
    function NewsMainComponent(modalService, service) {
        this.modalService = modalService;
        this.service = service;
        this.currentPage = 1;
        this.searchTerm = "";
    }
    NewsMainComponent.prototype.ngOnInit = function () {
        this.search("");
    };
    NewsMainComponent.prototype.search = function (value) {
        var _this = this;
        this.service.search(value).subscribe(function (result) {
            _this.maxPage = result.maxPage;
            _this.itemList = result.objList;
        });
    };
    NewsMainComponent.prototype.filter = function () {
        var _this = this;
        var newSearchTerm = this.searchTerm;
        setTimeout(function () {
            if (newSearchTerm == _this.searchTerm) {
                _this.search(_this.searchTerm);
            }
        }, 300);
    };
    NewsMainComponent.prototype.create = function () {
        var _this = this;
        this.modalService.init(NewsCreateComponent, [], function () { return _this.search(""); });
    };
    NewsMainComponent.prototype.edit = function (item) {
        var _this = this;
        this.modalService.init(NewsCreateComponent, item, function () { return _this.search(""); });
    };
    NewsMainComponent.prototype.delete = function (id) {
        var _this = this;
        this.service.delete(id).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200) {
                alert("success");
                _this.search("");
            }
        });
    };
    NewsMainComponent = tslib_1.__decorate([
        Component({
            selector: 'app-news-main',
            templateUrl: './news-main.component.html',
            styleUrls: ['./news-main.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, NewsService])
    ], NewsMainComponent);
    return NewsMainComponent;
}());
export { NewsMainComponent };
//# sourceMappingURL=news-main.component.js.map