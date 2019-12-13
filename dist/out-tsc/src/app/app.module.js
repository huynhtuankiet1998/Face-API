"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var nav_menu_component_1 = require("./nav-menu/nav-menu.component");
var home_component_1 = require("./home/home.component");
var configuration_component_1 = require("./configuration/configuration.component");
var face_tester_component_1 = require("./face-tester/face-tester.component");
var http_1 = require("@angular/common/http");
var face_api_service_service_1 = require("./services/face-api-service.service");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var input_box_component_1 = require("./input-box/input-box.component");
var input_box_service_1 = require("./input-box/input-box.service");
var ngx_loading_1 = require("ngx-loading");
var angular2_toaster_1 = require("angular2-toaster");
var face_grouping_component_1 = require("./face-grouping/face-grouping.component");
var find_similar_component_1 = require("./find-similar/find-similar.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                nav_menu_component_1.NavMenuComponent,
                home_component_1.HomeComponent,
                configuration_component_1.ConfigurationComponent,
                face_tester_component_1.FaceTesterComponent,
                input_box_component_1.InputBoxComponent,
                face_grouping_component_1.FaceGroupingComponent,
                find_similar_component_1.FindSimilarComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                animations_1.BrowserAnimationsModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                http_1.HttpClientModule,
                ngx_loading_1.LoadingModule,
                ng_bootstrap_1.NgbModule.forRoot(),
                angular2_toaster_1.ToasterModule.forRoot()
            ],
            providers: [
                face_api_service_service_1.FaceApiService,
                input_box_service_1.InputBoxService
            ],
            bootstrap: [app_component_1.AppComponent],
            entryComponents: [
                input_box_component_1.InputBoxComponent
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map