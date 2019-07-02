import { TestBed } from '@angular/core/testing';
import { NewsService } from './news.service';
describe('NewsService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(NewsService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=news.service.spec.js.map