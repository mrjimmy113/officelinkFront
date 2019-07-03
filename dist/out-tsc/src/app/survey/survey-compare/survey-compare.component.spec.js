import { async, TestBed } from '@angular/core/testing';
import { SurveyCompareComponent } from './survey-compare.component';
describe('SurveyCompareComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SurveyCompareComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SurveyCompareComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=survey-compare.component.spec.js.map