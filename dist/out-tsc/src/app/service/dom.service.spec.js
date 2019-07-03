import { TestBed } from '@angular/core/testing';
import { DomService } from './dom.service';
describe('DomService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DomService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=dom.service.spec.js.map