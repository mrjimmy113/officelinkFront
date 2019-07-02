import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { News } from 'src/app/model/news';
import { ModalService } from 'src/app/service/modal.service';
import { NewsService } from 'src/app/service/news.service';
var TestCreateComponent = /** @class */ (function () {
    function TestCreateComponent(modalService, service) {
        this.modalService = modalService;
        this.service = service;
        this.outputs = new EventEmitter();
        this.isEdit = false;
        this.maxFileSize = 500000;
        this.isOverSize = false;
    }
    TestCreateComponent.prototype.ngOnInit = function () {
        this.init();
    };
    TestCreateComponent.prototype.init = function () {
        if (this.inputs.length == 0) {
            this.news = new News();
        }
        else {
            this.news = this.inputs;
            this.isEdit = true;
        }
        this.requestStatus = 0;
    };
    TestCreateComponent.prototype.onFileChange = function (event) {
        var _this = this;
        if (!(event.target.value.length == 0)) {
            // if (event.target.files[0].size > this.maxFileSize) {
            //   this.isOverSize = true;
            // } else {
            this.tmp = event.target.files[0];
            var reader_1 = new FileReader();
            reader_1.readAsDataURL(this.tmp);
            reader_1.onload = function () { return (_this.previewImage = reader_1.result); };
            // }
        }
        else {
            this.previewImage = null;
        }
    };
    TestCreateComponent.prototype.close = function () {
        this.modalService.destroy();
    };
    TestCreateComponent.prototype.add = function (newsForm) {
        var _this = this;
        if (this.requestStatus == 201) {
            this.init();
            this.requestStatus = 0;
            newsForm.resetForm();
        }
        else {
            this.requestStatus = 1;
            var fd = new FormData();
            fd.append("file", this.tmp);
            fd.append("dto", JSON.stringify(this.news));
            this.service.create(fd).subscribe(function (result) {
                _this.requestStatus = result;
            });
        }
        (function (error) {
            if (error.status == 409) {
                alert("Title cannot be duplicated");
            }
            else if (error.status = 404) {
                alert("Bad request");
            }
            _this.close();
        });
    };
    TestCreateComponent.prototype.update = function (newsForm) {
        var _this = this;
        var fd = new FormData();
        fd.append("file", this.tmp);
        fd.append("dto", JSON.stringify(this.news));
        this.service.update(fd).subscribe(function (result) {
            _this.requestStatus = result;
        });
        if (this.requestStatus == 200) {
            alert("Update Successful");
            this.close();
        }
    };
    TestCreateComponent.prototype.save = function (newsForm) {
        this.requestStatus = 1;
        if (this.isEdit) {
            this.update(newsForm);
        }
        else {
            this.add(newsForm);
        }
    };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], TestCreateComponent.prototype, "inputs", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", Object)
    ], TestCreateComponent.prototype, "outputs", void 0);
    TestCreateComponent = tslib_1.__decorate([
        Component({
            selector: 'app-test-create',
            templateUrl: './test-create.component.html',
            styleUrls: ['./test-create.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [ModalService, NewsService])
    ], TestCreateComponent);
    return TestCreateComponent;
}());
export { TestCreateComponent };
//# sourceMappingURL=test-create.component.js.map