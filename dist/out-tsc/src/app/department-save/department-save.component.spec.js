import { async, TestBed } from '@angular/core/testing';
import { DepartmentSaveComponent } from './department-save.component';
describe('DepartmentSaveComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [DepartmentSaveComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(DepartmentSaveComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=department-save.component.spec.js.map