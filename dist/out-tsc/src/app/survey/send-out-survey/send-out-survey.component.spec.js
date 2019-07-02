import { async, TestBed } from '@angular/core/testing';
import { SendOutSurveyComponent } from './send-out-survey.component';
describe('SendOutSurveyComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [SendOutSurveyComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(SendOutSurveyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=send-out-survey.component.spec.js.map