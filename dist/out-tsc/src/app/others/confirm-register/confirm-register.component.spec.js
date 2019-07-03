import { async, TestBed } from '@angular/core/testing';
import { ConfirmRegisterComponent } from './confirm-register.component';
describe('ConfirmRegisterComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ConfirmRegisterComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ConfirmRegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=confirm-register.component.spec.js.map