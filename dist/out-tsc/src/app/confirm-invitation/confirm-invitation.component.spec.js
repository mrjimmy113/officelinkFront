import { async, TestBed } from '@angular/core/testing';
import { ConfirmInvitationComponent } from './confirm-invitation.component';
describe('ConfirmInvitationComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [ConfirmInvitationComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(ConfirmInvitationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=confirm-invitation.component.spec.js.map