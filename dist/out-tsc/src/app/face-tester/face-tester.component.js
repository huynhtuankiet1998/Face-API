"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var face_api_service_service_1 = require("../services/face-api-service.service");
var _ = require("lodash");
var forkJoin_1 = require("rxjs/observable/forkJoin");
var FaceTesterComponent = /** @class */ (function () {
    function FaceTesterComponent(faceApi) {
        this.faceApi = faceApi;
        this.loading = false;
        this.identifiedPersons = [];
        this.personGroups = [];
        this.selectedGroupId = '';
        this.identifiedFace = [];
    }
    FaceTesterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.faceApi.getPersonGroups().subscribe(function (data) {
            _this.personGroups = data;
            _this.loading = false;
        });
    };
    FaceTesterComponent.prototype.detect = function () {
        var _this = this;
        this.loading = true;
        this.faceApi.detect(this.imageUrl).subscribe(function (data) {
            _this.detectedFaces = data;
            console.log('**detect results', _this.detectedFaces);
            _this.loading = false;
        });
    };
    FaceTesterComponent.prototype.faceClicked = function (face) {
        this.selectedFace = face;
        if (this.selectedFace.identifiedPersonId) {
            var identifiedPerson = _.find(this.identifiedPersons, { 'personId': face.identifiedPersonId });
            this.selectedFace.name = identifiedPerson.name;
        }
    };
    FaceTesterComponent.prototype.identify = function () {
        var _this = this;
        var faceIds = _.map(this.detectedFaces, 'faceId');
        this.loading = true;
        this.faceApi.identify(this.selectedGroupId, faceIds).subscribe(function (identifiedFaces) {
            console.log('**identify results', identifiedFaces);
            var obsList = [];
            _.forEach(identifiedFaces, function (identifiedFace) {
                if (identifiedFace.candidates.length > 0) {
                    var detectedFace = _.find(_this.detectedFaces, { faceId: identifiedFace.faceId });
                    detectedFace.identifiedPerson = true;
                    detectedFace.identifiedPersonId = identifiedFace.candidates[0].personId;
                    detectedFace.identifiedPersonConfidence = identifiedFace.candidates[0].confidence;
                    obsList.push(_this.faceApi.getPerson(_this.selectedGroupId, identifiedFace.candidates[0].personId));
                }
            });
            forkJoin_1.forkJoin(obsList).subscribe(function (results) {
                _this.identifiedPersons = results;
                _this.loading = false;
            });
        });
    };
    FaceTesterComponent.prototype.identifylist = function () {
        var _this = this;
        var faceIds = _.map(this.detectedFaces, 'faceId');
        this.loading = true;
        this.faceApi.identify(this.selectedGroupId, faceIds).subscribe(function (identifiedFaces) {
            console.log('**identify results', identifiedFaces);
            var obsList = [];
            _.forEach(identifiedFaces, function (identifiedFace) {
                if (identifiedFace.candidates.length > 0) {
                    var detectedFace = _.find(_this.detectedFaces, { faceId: identifiedFace.faceId });
                    detectedFace.identifiedPerson = true;
                    detectedFace.identifiedPersonId = identifiedFace.candidates[0].personId;
                    detectedFace.identifiedPersonConfidence = identifiedFace.candidates[0].confidence;
                    obsList.push(_this.faceApi.getPersonFaces(_this.selectedGroupId, identifiedFace.candidates[0].personId));
                }
            });
            forkJoin_1.forkJoin(obsList).subscribe(function (results) {
                _this.identifiedPersons = results;
                _this.loading = false;
            });
        });
    };
    FaceTesterComponent.prototype.imageLoaded = function ($event) {
        this.selectedFace = null;
        this.detectedFaces = [];
        var img = this.mainImg.nativeElement;
        this.multiplier = img.clientWidth / img.naturalWidth;
    };
    __decorate([
        core_1.ViewChild('mainImg'),
        __metadata("design:type", Object)
    ], FaceTesterComponent.prototype, "mainImg", void 0);
    FaceTesterComponent = __decorate([
        core_1.Component({
            selector: 'app-face-tester',
            templateUrl: './face-tester.component.html',
            styleUrls: ['./face-tester.component.css']
        }),
        __metadata("design:paramtypes", [face_api_service_service_1.FaceApiService])
    ], FaceTesterComponent);
    return FaceTesterComponent;
}());
exports.FaceTesterComponent = FaceTesterComponent;
//# sourceMappingURL=face-tester.component.js.map