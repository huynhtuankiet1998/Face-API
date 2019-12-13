"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./home/home.component");
var configuration_component_1 = require("./configuration/configuration.component");
var face_tester_component_1 = require("./face-tester/face-tester.component");
var face_grouping_component_1 = require("./face-grouping/face-grouping.component");
var find_similar_component_1 = require("./find-similar/find-similar.component");
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'configuration', component: configuration_component_1.ConfigurationComponent },
    { path: 'test-faces', component: face_tester_component_1.FaceTesterComponent },
    { path: 'face-grouping', component: face_grouping_component_1.FaceGroupingComponent },
    { path: 'find-similar', component: find_similar_component_1.FindSimilarComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app-routing.module.js.map