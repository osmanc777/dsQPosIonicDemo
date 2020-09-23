webpackJsonp([0],{

/***/ 677:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardPageModule", function() { return CardPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__card__ = __webpack_require__(680);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CardPageModule = /** @class */ (function () {
    function CardPageModule() {
    }
    CardPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__card__["a" /* CardPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__card__["a" /* CardPage */]),
            ],
        })
    ], CardPageModule);
    return CardPageModule;
}());

//# sourceMappingURL=card.module.js.map

/***/ }),

/***/ 680:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_card_io__ = __webpack_require__(344);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CardPage = /** @class */ (function () {
    function CardPage(navCtrl, navParams, cardIO) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cardIO = cardIO;
    }
    CardPage.prototype.scan = function () {
        var _this = this;
        this.cardIO.canScan()
            .then(function (res) {
            if (res) {
                var options = {
                    requireExpiry: true,
                    requireCVV: false,
                    requirePostalCode: false
                };
                _this.cardIO.scan(options).then(function (data) {
                    console.log(data);
                });
            }
        });
    };
    CardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CardPage');
    };
    CardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-card',template:/*ion-inline-start:"/Users/jupiter/Apps/pos_ionic_demo/src/pages/card/card.html"*/'<!--\n  Generated template for the CardPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>card-page</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <button style="padding: 7px 10px" (click)="scan()">scan Card</button>\n</ion-content>\n'/*ion-inline-end:"/Users/jupiter/Apps/pos_ionic_demo/src/pages/card/card.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_card_io__["a" /* CardIO */]])
    ], CardPage);
    return CardPage;
}());

//# sourceMappingURL=card.js.map

/***/ })

});
//# sourceMappingURL=0.js.map