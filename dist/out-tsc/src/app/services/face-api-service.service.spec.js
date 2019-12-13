"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var face_api_service_service_1 = require("./face-api-service.service");
describe('FaceApiServiceService', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [face_api_service_service_1.FaceApiServiceService]
        });
    });
    it('should be created', testing_1.inject([face_api_service_service_1.FaceApiServiceService], function (service) {
        expect(service).toBeTruthy();
    }));
});
//# sourceMappingURL=face-api-service.service.spec.js.map