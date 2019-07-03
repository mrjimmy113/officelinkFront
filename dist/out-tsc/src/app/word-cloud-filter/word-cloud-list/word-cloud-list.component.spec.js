import { async, TestBed } from '@angular/core/testing';
import { WordCloudListComponent } from './word-cloud-list.component';
describe('WordCloudListComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [WordCloudListComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(WordCloudListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=word-cloud-list.component.spec.js.map