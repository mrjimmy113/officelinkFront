import * as tslib_1 from "tslib";
import { ModalService } from "../../service/modal.service";
import { WordCloudService } from "../../service/word-cloud.service";
import { WordCloudFilter } from "../../model/word-cloud-filter";
import { Component, Input } from "@angular/core";
import { Word } from "../../model/word";
var WordCloudSaveComponent = /** @class */ (function () {
    function WordCloudSaveComponent(ser, modalSer) {
        this.ser = ser;
        this.modalSer = modalSer;
        this.isEdit = false;
    }
    // Cái hàm này mỗi lần load component lên thì nó chạy
    WordCloudSaveComponent.prototype.ngOnInit = function () {
        this.init();
    };
    //Muốn new hay set up cái gì bỏ vô đây
    WordCloudSaveComponent.prototype.init = function () {
        if (this.inputs.length == 0) {
            this.words = new Array();
            this.filter = new WordCloudFilter();
        }
        else {
            this.filter = this.inputs;
            this.words = this.filter.wordList;
            this.isEdit = true;
        }
        this.currentWord = new Word();
        this.requestStatus = 0;
    };
    WordCloudSaveComponent.prototype.closeModal = function () {
        this.modalSer.destroy();
    };
    WordCloudSaveComponent.prototype.addWordToList = function () {
        var _this = this;
        var isDuplicate = false;
        this.words.every(function (element) {
            if (element.name == _this.currentWord.name.toLowerCase()) {
                isDuplicate = true;
                return false;
            }
            else
                return true;
        });
        if (!isDuplicate) {
            this.currentWord.name = this.currentWord.name.toLowerCase();
            this.words.push(this.currentWord);
        }
        this.currentWord = new Word();
    };
    WordCloudSaveComponent.prototype.add = function () {
        var _this = this;
        this.ser.create(this.filter).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 201)
                _this.closeModal();
        });
    };
    WordCloudSaveComponent.prototype.update = function () {
        var _this = this;
        this.ser.update(this.filter).subscribe(function (result) {
            _this.requestStatus = result;
            if (_this.requestStatus == 200)
                _this.closeModal();
        });
    };
    WordCloudSaveComponent.prototype.save = function () {
        this.requestStatus = 1;
        this.filter.wordList = this.words;
        if (this.isEdit)
            this.update();
        else
            this.add();
    };
    WordCloudSaveComponent.prototype.removeWord = function (index) {
        this.words.splice(index, 1);
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], WordCloudSaveComponent.prototype, "inputs", void 0);
    WordCloudSaveComponent = tslib_1.__decorate([
        Component({
            selector: "app-word-cloud-save",
            templateUrl: "./word-cloud-save.component.html",
            styleUrls: ["./word-cloud-save.component.css"]
        }),
        tslib_1.__metadata("design:paramtypes", [WordCloudService, ModalService])
    ], WordCloudSaveComponent);
    return WordCloudSaveComponent;
}());
export { WordCloudSaveComponent };
//# sourceMappingURL=word-cloud-save.component.js.map