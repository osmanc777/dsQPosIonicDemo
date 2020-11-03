webpackJsonp([3],{

/***/ 109:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 109;

/***/ }),

/***/ 150:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/card-details/card-details.module": [
		282,
		2
	],
	"../pages/card/card.module": [
		281,
		1
	],
	"../pages/maps/maps.module": [
		283,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 150;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_bluetooth_serial__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_mpos_mpos__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_interval__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_interval___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_interval__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// declare global {
//   interface Window {
//     getMposInfo: (data: any) => void;
//     dataPOS: any;
//     payLoad: any;
//   }
// }
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, btSerial, alert, plt, mpos, toastCtrl) {
        this.navCtrl = navCtrl;
        this.btSerial = btSerial;
        this.alert = alert;
        this.plt = plt;
        this.mpos = mpos;
        this.toastCtrl = toastCtrl;
        this.list = [];
        this.showCard = false;
        this.onQposConnected = false; //Conecto MPOS:
        this.onQposDisconnected = false; //Desconecto MPOS:
        this.onQposBadSwipe = false; //no reconocio la tarjeta swipe MPOS:
        this.onQposNoCard = false; //no detecto ninguna tarjeta:
        this.onQposTransaction = false; //Preparar MPOS chip/banda:
        this.onQposCardInfo = false; //Obtener Card MPOS banda:
        // onRequestDisplay
        this.onQposTranChip = false; //inserto CardChip: icc_card_inserted/EMV_ICC_Start
        this.onQposTranChipWait = false; //inserto CardChip: please wait..
        this.onQposTranChipRead = false; //leyendo CardChip: processing...
        this.onQposTranChipRemove = false; //remover CardChip:remove card
        this.onQposTranChipCardRemove = false; //Error retiro la tarjeta:card removed
        this.resChip = false; //respuesta chip
        this.objectCardData = {};
        this.initQpos();
    }
    HomePage.prototype.searchBt = function () {
        var _this = this;
        this.plt.ready().then(function () {
            _this.btSerial.list().then(function (data) {
                // console.log('Dispositivos: ', data);
                _this.list = data;
            }).catch(function (error) {
                console.log('Error al listar: ', error);
                console.log('Error al listar: ', JSON.stringify(error));
            });
        });
    };
    HomePage.prototype.connect = function (_a) {
        var name = _a.name, address = _a.address;
        var mac = name + "(" + address + ")";
        console.log('Mac Mpos: ', mac);
        this.mpos.connectBluetoothDevice(function (data) {
            // this.alert.create({ title: 'Conexión Exitosa', buttons:['Ok'] }).present();
            // console.log(data)
        }, function (error) {
            // this.alert.create({ title:"Conexión Fallida", message: error ,buttons:['Ok']}).present();
            // console.log(error)
        }, true, mac);
        this.onQposConnected = false;
        this.onQposDisconnected = false;
        this.onQposBadSwipe = false;
        this.onQposNoCard = false;
        this.onQposTransaction = false;
        this.onQposCardInfo = false;
        this.onQposTranChip = false;
        this.onQposTranChipWait = false;
        this.onQposTranChipRead = false;
        this.onQposTranChipRemove = false;
        this.onQposTranChipCardRemove = false;
        this.resChip = false;
        this.paramPos = '';
        this.cardDetail = {};
        this.objectCardData = {};
    };
    HomePage.prototype.startTransaction = function () {
        var _this = this;
        this.mpos.doTrade(function () { }, function (error) {
            console.log(error);
            _this.alert.create({ title: "Conexión Fallida", message: error, buttons: ['Ok'] }).present();
        }, 30);
        this.onQposConnected = false;
        this.onQposDisconnected = false;
        this.onQposBadSwipe = false;
        this.onQposNoCard = false;
        this.onQposTransaction = false;
        this.onQposCardInfo = false;
        this.onQposTranChip = false;
        this.onQposTranChipWait = false;
        this.onQposTranChipRead = false;
        this.onQposTranChipRemove = false;
        this.onQposTranChipCardRemove = false;
        this.resChip = false;
        this.paramPos = '';
        this.cardDetail = {};
        this.objectCardData = {};
    };
    HomePage.prototype.asingCard = function () {
        this.showCard = true;
        this.cardInfo = this.objectCardData;
    };
    HomePage.prototype.getQposInfo = function () {
        var _this = this;
        this.mpos.getQposInfo(function (data) {
            console.log('pos info: ', data);
        }, function (error) {
            console.log('pos info error: ', error);
            _this.alert.create({ title: "Error getQposInfo", message: error, buttons: ['Ok'] }).present();
        });
    };
    HomePage.prototype.getQposId = function () {
        var _this = this;
        this.mpos.getQposId(function (data) {
            console.log('posFun id: ', data);
        }, function (error) {
            console.log('posFun id error: ', error);
            _this.alert.create({ title: "Error getQposId", message: error, buttons: ['Ok'] }).present();
        });
    };
    HomePage.prototype.showAlert = function (title, msg) {
        this.alert.create({ title: title, message: msg, buttons: ['Ok'] }).present();
    };
    HomePage.prototype.presentToastInfo = function (message) {
        var toast = this.toastCtrl.create({
            message: message,
            duration: 1000,
            position: 'bottom'
        });
        toast.present();
    };
    HomePage.prototype.initQpos = function () {
        var _this = this;
        window.posresult = function (data) {
            // console.log('******************* data pos win ts ********************');
            // console.log(data);
            // console.log('******************* fin data pos win ts ********************');
            _this.getDataQpos(data);
        };
    };
    HomePage.prototype.getDataQpos = function (data) {
        this.paramPos = data;
        if (this.paramPos != undefined) {
            this.paramPos.startsWith('swipe card:') ? this.paramPos = 'getCard' :
                this.paramPos.startsWith('chipCard_') ? this.paramPos = 'getCardChip' : this.paramPos;
        }
        else {
            console.log('payLoad esta indefinido');
        }
        console.log('*-----------*------------*---------------*');
        console.log('ParamPOS NEW:', this.paramPos);
        console.log('*-----------*------------*---------------*');
        if (this.paramPos === 'onRequestQposConnected' && !this.onQposConnected) {
            this.onQposConnected = true;
            this.presentToastInfo('Conexión Exitosa');
        }
        else if (this.paramPos === 'onRequestQposDisconnected' && !this.onQposDisconnected) {
            this.onQposDisconnected = true;
            this.showAlert('MPOS desconectado', 'Vuelve a conectar el MPOS para cobrar');
        }
        else if (this.paramPos === 'please insert/swipe/tap card' && !this.onQposTransaction) {
            this.onQposTransaction = true;
            this.presentToastInfo('MPOS listo para cobrar');
        }
        else if (this.paramPos === 'bad_swipe' && !this.onQposBadSwipe) {
            this.onQposBadSwipe = true;
            // this.showAlert('Error Swipe', 'Vuelve a ingresar la tarjeta');
            this.presentToastInfo('No se reconocio la tarjeta, vuelve a intentar');
        }
        else if (this.paramPos === 'no_card_detected' && !this.onQposNoCard) {
            this.onQposNoCard = true;
            this.showAlert('Error en Tarjeta', 'No se reconocio la tarjeta, vuelve a ingresarla');
        }
        else if (this.paramPos == 'getCard' && !this.onQposCardInfo) {
            this.onQposCardInfo = true;
            this.showAlert('Tarjeta Aceptada', 'Acepta para realizar el cobro');
            this.parseCard(data);
            this.asingCard();
        }
        else if (this.paramPos === 'icc_card_inserted/EMV_ICC_Start' && !this.onQposTranChip) {
            this.onQposTranChip = true;
            console.log('inserto el chip de latarjeta:');
            this.presentToastInfo('Tarjeta Insertada');
        }
        else if (this.paramPos === 'card removed' && !this.onQposTranChipCardRemove) {
            this.onQposTranChipCardRemove = true;
            this.showAlert('Error', 'se retiro la tarjeta, vuelva a intentar');
        }
        else if (this.paramPos === 'please wait..' && !this.onQposTranChipWait) {
            this.onQposTranChipWait = true;
            console.log('leyendo tarjeta');
            this.presentToastInfo('Reconociendo tarjeta...');
        }
        else if (this.paramPos === 'processing...' && !this.onQposTranChipRead) {
            this.onQposTranChipRead = true;
            console.log('Procesando tarjeta');
            this.presentToastInfo('Procesando tarjeta...');
        }
        else if (this.paramPos === 'remove card' && !this.onQposTranChipRemove) {
            this.onQposTranChipRemove = true;
            console.log('Retira la tarjeta');
            this.presentToastInfo('Puedes retirar la tarjeta');
        }
        else if (this.paramPos === 'getCardChip' && !this.resChip) {
            this.resChip = true;
            console.log('Respuesta del Chip: ', data);
            this.showAlert('Tarjeta Aceptada Chip', 'Acepta para realizar el cobro');
            this.parseCardChip(data);
            this.asingCard();
        }
        else {
            console.log('ninguna acción: ', data);
        }
    };
    HomePage.prototype.parseCard = function (card) {
        var _this = this;
        this.cardDetail = card.split(',');
        this.cardDetail.forEach(function (element) {
            var propiedad = element.split('_').shift();
            var valor = element.substring(element.indexOf('_') + 1);
            _this.objectCardData[propiedad] = valor.trim();
        });
        console.log('************ card detail *****************');
        console.log(this.objectCardData);
    };
    HomePage.prototype.parseCardChip = function (card) {
        var prop = card.split('_').shift();
        var value = card.substring(card.indexOf('_') + 1);
        this.objectCardData[prop] = value.trim();
        console.log('************ card detail chip *****************');
        console.log(this.objectCardData);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/jupiter/Apps/pos_ionic_demo/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Tes QMPOS Pagalo\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n\n  <ion-item>\n\n    <button (click)="searchBt()" style="padding: 15px; margin: 4px;">Buscar MPOS</button>\n\n    <div class="list" *ngIf="list.length > 0">\n      <p>Listado de Dispositivos</p>\n      <hr>\n      <p *ngFor="let device of list" (click)="connect(device)">{{device.name}}</p>\n    </div>\n\n  </ion-item>\n  \n  <ion-item>\n    <button (click)="startTransaction()" style="padding: 15px; margin-bottom: 3px;">Obtener Tarjeta: Chip/Swipe</button>\n  </ion-item>\n  \n  <ion-item>\n    <button (click)="getQposInfo()" style="padding: 15px">Información del MPOS</button>\n  </ion-item>\n  \n  <ion-item>\n    <button (click)="getQposId()" style="padding: 15px">Obtener id del MPOS</button>\n  </ion-item>\n  \n  <ion-item>\n    <button (click)="asingCard()" style="padding: 15px">Mostar Tarjeta</button>\n  </ion-item>\n  \n  <ion-item *ngIf="showCard">\n    <p>\n      Tarjeta\n    </p>\n\n    <pre>\n      <code>\n        {{ cardInfo | json }}\n      </code>\n    </pre>\n  </ion-item>\n  \n  <!-- <ion-item>\n    <button (click)="updateEmvConfig()" style="padding: 15px">Update Emv Config by Bin</button>\n  </ion-item>\n  \n  <ion-item>\n    <button (click)="updateEmv()" style="padding: 15px">Update Emv Config by Tag</button>\n  </ion-item> -->\n</ion-content>\n'/*ion-inline-end:"/Users/jupiter/Apps/pos_ionic_demo/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_3__providers_mpos_mpos__["a" /* MposProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* ToastController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MposProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_core__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MposProvider = /** @class */ (function () {
    function MposProvider() {
    }
    MposProvider.prototype.doTrade = function (success, error, timeout) {
        console.log('success ', success);
        console.log('error ', error);
        console.log('timeout ', timeout);
        console.log('hola doTrade');
    };
    MposProvider.prototype.scanQPos2Mode = function (success, error) {
    };
    MposProvider.prototype.setCardTradeMode = function () {
        return;
    };
    MposProvider.prototype.getQposInfo = function (success, error) { };
    MposProvider.prototype.getQposId = function (success, error) {
        console.log('hola');
    };
    MposProvider.prototype.connectBluetoothDevice = function (success, error, isConnect, bluetoothAddress) {
        console.log('success', success);
        console.log('error', error);
        console.log('isConnect', isConnect);
        console.log('bluetoothAddress', bluetoothAddress);
    };
    MposProvider.prototype.getDeviceList = function (success, error) { };
    MposProvider.prototype.updateEmvApp = function (success, error) { };
    MposProvider.prototype.updateEmvConfig = function (success, error) { };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "doTrade", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "scanQPos2Mode", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], MposProvider.prototype, "setCardTradeMode", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "getQposInfo", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "getQposId", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "connectBluetoothDevice", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "getDeviceList", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "updateEmvApp", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["a" /* Cordova */])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], MposProvider.prototype, "updateEmvConfig", null);
    MposProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__ionic_native_core__["d" /* Plugin */])({
            pluginName: "posPlugin",
            plugin: "posPlugin",
            pluginRef: "cordova.plugins.dspread_pos_plugin",
            repo: "https://github.com/fullstackmofo/Mpos.git",
            platforms: ["Android", "iOS"]
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], MposProvider);
    return MposProvider;
}());

//# sourceMappingURL=mpos.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(221);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_bluetooth_serial__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_card_io__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__providers_mpos_mpos__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};








// import { MapsPage } from '../pages/maps/maps';



var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/card/card.module#CardPageModule', name: 'CardPage', segment: 'card', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/card-details/card-details.module#CardDetailsPageModule', name: 'CardDetailsPage', segment: 'card-details', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/maps/maps.module#MapsPageModule', name: 'MapsPage', segment: 'maps', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_card_io__["a" /* CardIO */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_10__providers_mpos_mpos__["a" /* MposProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(193);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/Users/jupiter/Apps/pos_ionic_demo/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/jupiter/Apps/pos_ionic_demo/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[198]);
//# sourceMappingURL=main.js.map