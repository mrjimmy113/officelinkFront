import { TestBed } from '@angular/core/testing';
import { TeamService } from './team.service';
describe('TeamService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(TeamService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=team.service.spec.js.map