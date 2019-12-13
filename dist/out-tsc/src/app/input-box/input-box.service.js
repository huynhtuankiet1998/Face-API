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
var input_box_component_1 = require("./input-box.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var InputBoxService = /** @class */ (function () {
    function InputBoxService(modal) {
        this.modal = modal;
    }
    InputBoxService.prototype.show = function (title, message) {
        var modalRef = this.modal.open(input_box_component_1.InputBoxComponent);
        modalRef.componentInstance.properties = { title: title, message: message };
        var promise = new Promise(function (resolve, reject) {
            modalRef.result.then(function (result) { return resolve(result); }, function (reason) { return reason; });
        });
        return promise;
    };
    InputBoxService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ng_bootstrap_1.NgbModal])
    ], InputBoxService);
    return InputBoxService;
}());
exports.InputBoxService = InputBoxService;
//# sourceMappingURL=input-box.service.js.map