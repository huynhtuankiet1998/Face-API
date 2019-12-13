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
var input_box_service_1 = require("../input-box/input-box.service");
var _ = require("lodash");
var angular2_toaster_1 = require("angular2-toaster");
var ConfigurationComponent = /** @class */ (function () {
    function ConfigurationComponent(faceApi, inputBox, toastr) {
        this.faceApi = faceApi;
        this.inputBox = inputBox;
        this.toastr = toastr;
        this.loading = false;
        this.personFaces = [];
        this.personGroups = [];
        this.personList = [];
        this.selectedGroupId = '';
    }
    ConfigurationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.faceApi.getPersonGroups().subscribe(function (data) { return _this.personGroups = data; });
    };
    ConfigurationComponent.prototype.addPersonGroup = function () {
        var _this = this;
        this.inputBox.show('Thêm Lớp ', 'Tên lớp:').then(function (result) {
            var newPersonGroup = { personGroupId: _.kebabCase(result), name: result };
            _this.faceApi.createPersonGroup(newPersonGroup).subscribe(function (data) {
                _this.personGroups.push(newPersonGroup);
                _this.selectedGroupId = newPersonGroup.personGroupId;
                _this.onGroupsChange();
            });
        });
    };
    ConfigurationComponent.prototype.deletePersonGroup = function () {
        var _this = this;
        this.faceApi.deletePersonGroup(this.selectedGroupId).subscribe(function () {
            _.remove(_this.personGroups, function (x) { return x.personGroupId === _this.selectedGroupId; });
            _this.selectedGroupId = '';
        });
    };
    ConfigurationComponent.prototype.onGroupsChange = function () {
        var _this = this;
        if (this.selectedGroupId) {
            this.loading = true;
            this.faceApi.getPersonsByGroup(this.selectedGroupId).subscribe(function (data) {
                _this.personList = data;
                _this.selectedPerson = null;
                _this.personFaces = [];
                _this.loading = false;
            });
        }
    };
    ConfigurationComponent.prototype.personClick = function (person) {
        var _this = this;
        this.selectedPerson = person;
        this.faceApi.getPersonFaces(this.selectedGroupId, this.selectedPerson.personId).subscribe(function (data) {
            _this.personFaces = data;
        });
    };
    ConfigurationComponent.prototype.addPerson = function () {
        var _this = this;
        this.inputBox.show('Thêm sinh viên', 'Tên sinh viên:').then(function (result) {
            var newPerson = { name: result };
            _this.faceApi.createPerson(_this.selectedGroupId, { name: result }).subscribe(function (data) {
                newPerson.personId = data.personId;
                _this.personList.push(newPerson);
                _this.selectedPerson = newPerson;
            });
        });
    };
    ConfigurationComponent.prototype.deletePerson = function (personId) {
        var _this = this;
        this.faceApi.deletePerson(this.selectedGroupId, this.selectedPerson.personId).subscribe(function () {
            _.remove(_this.personList, function (x) { return x.personId === _this.selectedPerson.personId; });
            _this.selectedPerson = null;
        });
    };
    ConfigurationComponent.prototype.addPersonFace = function () {
        var _this = this;
        this.inputBox.show('Thêm ảnh', 'URL:').then(function (result) {
            _this.faceApi.addPersonFace(_this.selectedGroupId, _this.selectedPerson.personId, result).subscribe(function (data) {
                var newFace = { persistedFaceId: data.persistedFaceId, userData: result };
                _this.personFaces.push(newFace);
            });
        });
    };
    ConfigurationComponent.prototype.deletePersonFace = function (persistedFaceId) {
        var _this = this;
        this.faceApi.deletePersonFace(this.selectedGroupId, this.selectedPerson.personId, persistedFaceId).subscribe(function () {
            _.remove(_this.personFaces, function (x) { return x.persistedFaceId === persistedFaceId; });
        });
    };
    ConfigurationComponent.prototype.trainPersonGroup = function () {
        var _this = this;
        this.loading = true;
        this.faceApi.trainPersonGroup(this.selectedGroupId).subscribe(function () {
            _this.toastr.pop('info', 'Training', 'Training...');
            _this.loading = false;
        });
    };
    ConfigurationComponent.prototype.getGroupTrainingStatus = function () {
        var _this = this;
        this.loading = true;
        this.faceApi.getPersonGroupTrainingStatus(this.selectedGroupId).subscribe(function (result) {
            switch (result.status) {
                case 'succeeded':
                    _this.toastr.pop('Thành Công', 'Training Thành Công');
                    break;
                case 'running':
                    _this.toastr.pop('info', 'Đang Trainning...', 'Thử lại sau');
                    break;
                case 'failed':
                    _this.toastr.pop('error', 'Không thể Training', result.message);
                    break;
                default:
                    break;
            }
            _this.loading = false;
        });
    };
    ConfigurationComponent = __decorate([
        core_1.Component({
            selector: 'app-configuration',
            templateUrl: './configuration.component.html',
            styleUrls: ['./configuration.component.css']
        }),
        __metadata("design:paramtypes", [face_api_service_service_1.FaceApiService, input_box_service_1.InputBoxService, angular2_toaster_1.ToasterService])
    ], ConfigurationComponent);
    return ConfigurationComponent;
}());
exports.ConfigurationComponent = ConfigurationComponent;
//# sourceMappingURL=configuration.component.js.map