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
var FindSimilarComponent = /** @class */ (function () {
    function FindSimilarComponent(faceApi) {
        this.faceApi = faceApi;
        this.loading = false;
        this.queryFace = 'https://lh3.googleusercontent.com/kvh3Vav9EUzKdvH8jeUbD2grO_cftMq_c-yy-oPF4c0uvKc1OhWOWlWoLlMNjT2guVc7f_McErCYXxZsNKHRrzdgrKuhNcV_6qM7JAoH-F7j0eBYTRi9h0HY9l1EzwmJCozu0YLcOARE7Gzh68WlveKFYNag1T5_i4jfuN_-Pp0km9TZDgHUsrlWLiIeCGjqi3_-g-4-2HyUKWYlHADDbqQKPzvK6EUQ6no5VPaumM9hp2T9F8fHR3gCOsdrsCYMO-qYgDc0xDFHpHgVzbp9ur-Mus5AVa733Ks4p2SOnBvBsjGvCt8F6yzin_y9-PPd8uuV_pMCBHUH7wEVGAdtgVKGVcUTB73CBR9rPJWKQhRoCTELBNIG5MbyikYOXR5ZMcUBS1VnbP5Y8qfOC4MTabxnHA7iabR9VtLCM4R0Nh4mk_zXOEu2rJyFFxo5nhtFaGxVbV2YBEO2CMP_aN0h2sA_LUzrkfscRamv06krluzPUZWKlHz-nkd9G1WMbs4rHgy_-BNsnGXsQ3jIUEImgOocyogtKTQygaj-Ha-eOJ55OvSE6eHzaXQ6UJfEJQRJKZnYOUvuCwO_OBRwojdMMS1Mun6e1wWnEJswT9O-KVP85wf212b0SMM5vQ1bGuXjyRt134Y_BpbxUQGGPKMDPfaqWqOGvRwyWXrvt7venb-ejhx2n0TNBX44BRC4BciIOzHyTRphbYbVhte3T3O2DKLbLNxrYYhaDxsHDmOKyV9JGicB=s883-no';
    }
    FindSimilarComponent.prototype.ngOnInit = function () { };
    FindSimilarComponent.prototype.findSimilar = function () {
        var _this = this;
        this.loading = true;
        // 1. First create a face list with all the imageUrls
        var faceListId = (new Date()).getTime().toString(); // comically naive, but this is just for demo
        this.faceApi.createFaceList(faceListId).subscribe(function () {
            // 2. Now add all faces to face list
            var facesSubscribableList = [];
            var urls = _.split(_this.imageUrls, '\n');
            _.forEach(urls, function (url) {
                if (url) {
                    facesSubscribableList.push(_this.faceApi.addFace(faceListId, url));
                }
            });
            forkJoin_1.forkJoin(facesSubscribableList).subscribe(function (results) {
                _this.faces = [];
                _.forEach(results, function (value, index) { return _this.faces.push({ url: urls[index], faceId: value.persistedFaceId }); });
                // 3. Call Detect on query face so we can establish a faceId 
                _this.faceApi.detect(_this.queryFace).subscribe(function (queryFaceDetectResult) {
                    var queryFaceId = queryFaceDetectResult[0].faceId;
                    // 4. Call Find Similar with the query face and the face list
                    _this.faceApi.findSimilar(faceListId, queryFaceId).subscribe(function (finalResults) {
                        console.log('**findsimilar Results', finalResults);
                        _this.findSimilarResults = finalResults;
                        _this.loading = false;
                    });
                });
            });
        });
    };
    FindSimilarComponent.prototype.getUrlForFace = function (faceId) {
        var face = _.find(this.faces, { faceId: faceId });
        return face.url;
    };
    FindSimilarComponent = __decorate([
        core_1.Component({
            selector: 'app-find-similar',
            templateUrl: './find-similar.component.html',
            styleUrls: ['./find-similar.component.css']
        }),
        __metadata("design:paramtypes", [face_api_service_service_1.FaceApiService])
    ], FindSimilarComponent);
    return FindSimilarComponent;
}());
exports.FindSimilarComponent = FindSimilarComponent;
//# sourceMappingURL=find-similar.component.js.map