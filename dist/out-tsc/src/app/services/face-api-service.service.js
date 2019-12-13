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
var http_1 = require("@angular/common/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/of");
var FaceApiService = /** @class */ (function () {
    function FaceApiService(http) {
        this.http = http;
        this.baseUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0';
    }
    // ***** Person Group *****
    FaceApiService.prototype.getPersonGroups = function () {
        return this.http.get(this.baseUrl + "/persongroups", httpOptions);
    };
    FaceApiService.prototype.createPersonGroup = function (personGroup) {
        return this.http.put(this.baseUrl + "/persongroups/" + personGroup.personGroupId, personGroup, httpOptions);
    };
    FaceApiService.prototype.deletePersonGroup = function (personGroupId) {
        return this.http.delete(this.baseUrl + "/persongroups/" + personGroupId, httpOptions);
    };
    FaceApiService.prototype.trainPersonGroup = function (personGroupId) {
        return this.http.post(this.baseUrl + "/persongroups/" + personGroupId + "/train", null, httpOptions);
    };
    FaceApiService.prototype.getPersonGroupTrainingStatus = function (personGroupId) {
        return this.http.get(this.baseUrl + "/persongroups/" + personGroupId + "/training", httpOptions);
    };
    // ***** Persons Operations *****
    FaceApiService.prototype.getPersonsByGroup = function (personGroupId) {
        return this.http.get(this.baseUrl + "/persongroups/" + personGroupId + "/persons", httpOptions);
    };
    FaceApiService.prototype.getPerson = function (personGroupId, personId) {
        return this.http.get(this.baseUrl + "/persongroups/" + personGroupId + "/persons/" + personId, httpOptions);
    };
    // ***** Person Operations *****
    FaceApiService.prototype.createPerson = function (personGroupId, person) {
        return this.http.post(this.baseUrl + "/persongroups/" + personGroupId + "/persons", person, httpOptions);
    };
    FaceApiService.prototype.deletePerson = function (personGroupId, personId) {
        return this.http.delete(this.baseUrl + "/persongroups/" + personGroupId + "/persons/" + personId, httpOptions);
    };
    // ***** Person Face Operations *****/
    FaceApiService.prototype.getPersonFaces = function (personGroupId, personId) {
        var _this = this;
        return this.http.get(this.baseUrl + "/persongroups/" + personGroupId + "/persons/" + personId, httpOptions).flatMap(function (person) {
            var obsList = [];
            if (person.persistedFaceIds.length) {
                for (var _i = 0, _a = person.persistedFaceIds; _i < _a.length; _i++) {
                    var faceId = _a[_i];
                    obsList.push(_this.getPersonFace(personGroupId, personId, faceId));
                }
                return Observable_1.Observable.forkJoin(obsList);
            }
            else {
                return Observable_1.Observable.of([]);
            }
        });
    };
    FaceApiService.prototype.getPersonFace = function (personGroupId, personId, faceId) {
        return this.http.get(this.baseUrl + "/persongroups/" + personGroupId + "/persons/" + personId + "/persistedfaces/" + faceId, httpOptions);
    };
    FaceApiService.prototype.addPersonFace = function (personGroupId, personId, url) {
        return this.http.post(this.baseUrl + "/persongroups/" + personGroupId + "/persons/" + personId + "/persistedfaces?userData=" + url, { url: url }, httpOptions);
    };
    FaceApiService.prototype.deletePersonFace = function (personGroupId, personId, faceId) {
        return this.http.delete(this.baseUrl + "/persongroups/" + personGroupId + "/persons/" + personId + "/persistedfaces/" + faceId, httpOptions);
    };
    // ***** Face List Operations *****
    FaceApiService.prototype.createFaceList = function (faceListId) {
        return this.http.put(this.baseUrl + "/facelists/" + faceListId, { name: faceListId }, httpOptions);
    };
    FaceApiService.prototype.addFace = function (faceListId, url) {
        return this.http.post(this.baseUrl + "/facelists/" + faceListId + "/persistedFaces", { url: url }, httpOptions);
    };
    // ***** Face Operations *****
    FaceApiService.prototype.detect = function (url) {
        return this.http.post(this.baseUrl + "/detect?returnFaceLandmarks=false&returnFaceAttributes=age,gender,smile,glasses,emotion,facialHair", { url: url }, httpOptions);
    };
    FaceApiService.prototype.identify = function (personGroupId, faceIds) {
        var request = {
            personGroupId: personGroupId,
            faceIds: faceIds,
            confidenceThreshold: 0.4
        };
        return this.http.post(this.baseUrl + "/identify", request, httpOptions);
    };
    FaceApiService.prototype.group = function (faceIds) {
        return this.http.post(this.baseUrl + "/group", { faceIds: faceIds }, httpOptions);
    };
    FaceApiService.prototype.findSimilar = function (faceListId, faceId) {
        var request = { faceId: faceId, faceListId: faceListId };
        return this.http.post(this.baseUrl + "/findsimilars", request, httpOptions);
    };
    FaceApiService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], FaceApiService);
    return FaceApiService;
}());
exports.FaceApiService = FaceApiService;
var httpOptions = {
    headers: new http_1.HttpHeaders({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '412490c6fc28481caeb97d5640d06c4b'
    })
};
//# sourceMappingURL=face-api-service.service.js.map