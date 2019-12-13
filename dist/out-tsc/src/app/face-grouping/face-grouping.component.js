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
var _ = require("lodash");
var face_api_service_service_1 = require("../services/face-api-service.service");
var forkJoin_1 = require("rxjs/observable/forkJoin");
var FaceGroupingComponent = /** @class */ (function () {
    function FaceGroupingComponent(faceApi) {
        this.faceApi = faceApi;
        this.groupingResults = {};
        this.loading = false;
    }
    FaceGroupingComponent.prototype.ngOnInit = function () { };
    FaceGroupingComponent.prototype.executeGrouping = function () {
        var _this = this;
        var urls = _.split(this.imageUrls, '\n');
        var detectList = [];
        _.forEach(urls, function (url) {
            if (url) {
                detectList.push(_this.faceApi.detect(url));
            }
        });
        this.loading = true;
        forkJoin_1.forkJoin(detectList).subscribe(function (detectResults) {
            _this.faces = [];
            _.forEach(detectResults, function (value, index) { return _this.faces.push({ url: urls[index], faceId: value[0].faceId }); });
            var faceIds = _.map(_this.faces, 'faceId');
            _this.faceApi.group(faceIds).subscribe(function (data) {
                _this.groupingResults = data;
                _this.loading = false;
            });
        });
    };
    FaceGroupingComponent.prototype.getUrlForFace = function (faceId) {
        var face = _.find(this.faces, { faceId: faceId });
        return face.url;
    };
    FaceGroupingComponent = __decorate([
        core_1.Component({
            selector: 'app-face-grouping',
            templateUrl: './face-grouping.component.html',
            styleUrls: ['./face-grouping.component.css']
        }),
        __metadata("design:paramtypes", [face_api_service_service_1.FaceApiService])
    ], FaceGroupingComponent);
    return FaceGroupingComponent;
}());
exports.FaceGroupingComponent = FaceGroupingComponent;
//# sourceMappingURL=face-grouping.component.js.map