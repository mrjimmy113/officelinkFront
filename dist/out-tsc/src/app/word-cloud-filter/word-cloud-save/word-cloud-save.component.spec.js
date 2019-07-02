import { async, TestBed } from '@angular/core/testing';
import { WordCloudSaveComponent } from './word-cloud-save.component';
describe('WordCloudSaveComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [WordCloudSaveComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(WordCloudSaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=word-cloud-save.component.spec.js.map