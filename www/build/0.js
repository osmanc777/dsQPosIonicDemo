webpackJsonp([0],{

/***/ 283:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapsPageModule", function() { return MapsPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__maps__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MapsPageModule = /** @class */ (function () {
    function MapsPageModule() {
    }
    MapsPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__maps__["a" /* MapsPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__maps__["a" /* MapsPage */]),
            ],
        })
    ], MapsPageModule);
    return MapsPageModule;
}());

//# sourceMappingURL=maps.module.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__ = __webpack_require__(197);
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
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MapsPage = /** @class */ (function () {
    function MapsPage(navCtrl, navParams, geolocation) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
    }
    MapsPage.prototype.ionViewDidLoad = function () {
        //  this.showMap();
        // this.addHubsToMap();
        this.init();
    };
    MapsPage.prototype.showMap = function () {
        var _this = this;
        var hubs = [
            {
                name: 'Ikeja',
                address: 'No 1 Regina Omolara street Off Agbaoku Street,Opebi lagos Ikeja',
                coordinate: { lat: 6.5960857, lng: 3.3573389 }
            },
            {
                name: 'Benin',
                address: '108 Namula str opp  Ground foundation group sch off limot road off Sapele road Benin',
                coordinate: { lat: 6.287494, lng: 5.622864 }
            }
        ];
        var location = new google.maps.LatLng(6.5960857, 3.3573389);
        // map options 
        var options = {
            center: location,
            zoom: 10
        };
        hubs.forEach(function (hub) {
            var location = new google.maps.LatLng(hub.coordinate.lat, hub.coordinate.lng);
            var map = new google.maps.Map(_this.mapRef.nativeElement, options);
            _this.addMarker(location, map);
        });
        /* const map = new google.maps.Map(this.mapRef.nativeElement, options);
        
        this.addMarker(location, map) */
    };
    MapsPage.prototype.addMarker = function (position, map) {
        return new google.maps.Marker({
            position: position,
            map: map,
            icon: 'https://cdn.zeplin.io/5c6d4f6b6f0f43465e306384/assets/F0B25DA8-A76C-4387-A611-3B7FA2E72F3C.svg'
        });
    };
    MapsPage.prototype.init = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (res) {
            // resp.coords.latitude
            // resp.coords.longitude
            _this.map = new google.maps.Map(_this.mapRef.nativeElement, {
                center: { lat: res.coords.latitude, lng: res.coords.longitude },
                mapTypeId: 'roadmap',
                zoom: 10
            });
            var location = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
            _this.addMarker(location, _this.map);
            _this.addHubsToMap(res.coords.latitude, res.coords.longitude);
        }).catch(function (error) {
            console.log('Error getting location', error);
        });
        /* navigator.geolocation.getCurrentPosition( res => {
    
         this.map =  new google.maps.Map(this.mapRef.nativeElement, {
            center:{lat:res.coords.latitude, lng:res.coords.longitude},
            mapTypeId: 'roadmap',
            zoom:10
          });
          
          
      
          const location = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
    
          this.addMarker(location, this.map)
    
          this.addHubsToMap(res.coords.latitude, res.coords.longitude)
        }) */
    };
    MapsPage.prototype.addHubsToMap = function (lat, lng) {
        var _this = this;
        console.log(lat, lng);
        /* const map = new google.maps.Map(this.mapRef.nativeElement, {
          center:{lat, lng},
         // mapTypeId: google.maps.MapTypeId.ROADMAP,
         mapTypeId: 'roadmap',
          mapTypeControl: false,
          zoom:10
        }); */
        var hubs = [
            {
                name: 'Ikeja',
                address: 'No 1 Regina Omolara street Off Agbaoku Street,Opebi lagos Ikeja',
                coordinate: { lat: 6.5960857, lng: 3.3573389 }
            },
            {
                name: 'Benin',
                address: '108 Namula str opp  Ground foundation group sch off limot road off Sapele road Benin',
                coordinate: { lat: 6.430233, lng: 3.411553 }
            },
            {
                name: 'Port Harcourt',
                address: 'Plot 4CUnity streeet off Iwowari Avenue off Peter Odili road Trans amadi',
                coordinate: { lat: 4.793881, lng: 7.037801 }
            }
        ];
        hubs.forEach(function (hub) {
            var marker = new google.maps.Marker({
                map: _this.map,
                position: new google.maps.LatLng(hub.coordinate.lat, hub.coordinate.lng),
                title: hub.name,
            });
            var infoWindow = new google.maps.InfoWindow();
            // Allow each marker to have an info window
            google.maps.event.addListener(marker, 'click', function () {
                infoWindow.setContent(hub.address);
                infoWindow.open(_this.map, marker);
            });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('map'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */])
    ], MapsPage.prototype, "mapRef", void 0);
    MapsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-maps',template:/*ion-inline-start:"/Users/jupiter/Apps/pos_ionic_demo/src/pages/maps/maps.html"*/'<!--\n  Generated template for the MapsPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <ion-title>maps</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n    <div  #map id="map"></div>\n</ion-content>\n'/*ion-inline-end:"/Users/jupiter/Apps/pos_ionic_demo/src/pages/maps/maps.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_geolocation__["a" /* Geolocation */]])
    ], MapsPage);
    return MapsPage;
}());

//# sourceMappingURL=maps.js.map

/***/ })

});
//# sourceMappingURL=0.js.map