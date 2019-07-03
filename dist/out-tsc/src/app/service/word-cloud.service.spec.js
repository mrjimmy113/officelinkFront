import { TestBed } from '@angular/core/testing';
import { WordCloudService } from './word-cloud.service';
describe('WordCloudService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(WordCloudService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=word-cloud.service.spec.js.map