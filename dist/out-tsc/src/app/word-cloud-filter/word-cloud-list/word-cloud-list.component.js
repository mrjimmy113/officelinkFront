import * as tslib_1 from "tslib";
import { WordCloudService } from '../../service/word-cloud.service';
import { WordCloudSaveComponent } from './../word-cloud-save/word-cloud-save.component';
import { ModalService } from '../../service/modal.service';
import { Component } from '@angular/core';
var WordCloudListComponent = /** @class */ (function () {
    function WordCloudListComponent(modalSer, ser) {
        this.modalSer = modalSer;
        this.ser = ser;
        this.isSort = "";
        this.currentPage = 1;
        this.searchTerm = "";
    }
    WordCloudListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ser.search("").subscribe(function (result) {
            _this.maxPage = result.maxPage;
            _this.itemList = result.objList;
        });
    };
    WordCloudListComponent.prototype.openCreate = function () {
        this.modalSer.init(WordCloudSaveComponent, [], []);
    };
    WordCloudListComponent.prototype.openEdit = function (item) {
        this.modalSer.init(WordCloudSaveComponent, item, []);
    };
    WordCloudListComponent.prototype.search = function () {
    };
    WordCloudListComponent = tslib_1.__decorate([
        Component({
            selector: 'app-word-cloud-list',
            templateUrl: './word-cloud-list.component.html',
            styleUrls: ['./word-cloud-list.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, WordCloudService])
    ], WordCloudListComponent);
    return WordCloudListComponent;
}());
export { WordCloudListComponent };
//# sourceMappingURL=word-cloud-list.component.js.map