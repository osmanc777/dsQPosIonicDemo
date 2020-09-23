import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google: any;

/**
 * Generated class for the MapsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maps',
  templateUrl: 'maps.html',
})
export class MapsPage {

  @ViewChild('map') mapRef: ElementRef

  public lat;
  public lng;
  public map ;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
  //  this.showMap();
   // this.addHubsToMap();
   this.init()
  }

  showMap() {
    const hubs = [
      {
        name: 'Ikeja',
        address: 'No 1 Regina Omolara street Off Agbaoku Street,Opebi lagos Ikeja',
        coordinate: {lat:6.5960857, lng: 3.3573389}
      },
      {
        name: 'Benin',
        address: '108 Namula str opp  Ground foundation group sch off limot road off Sapele road Benin',
        coordinate: {lat:6.287494, lng:5.622864}
      }
    
    ];

  const location = new google.maps.LatLng(6.5960857, 3.3573389);

  // map options 
  const options = {
    center: location,
    zoom: 10
  }

  hubs.forEach( hub => {

    const location = new google.maps.LatLng(hub.coordinate.lat, hub.coordinate.lng);

    const map = new google.maps.Map(this.mapRef.nativeElement, options);
  
    this.addMarker(location, map)
  })

  /* const map = new google.maps.Map(this.mapRef.nativeElement, options);
  
  this.addMarker(location, map) */

  }

  addMarker(position, map) {
      return new google.maps.Marker({
        position,
        map,
        icon:'https://cdn.zeplin.io/5c6d4f6b6f0f43465e306384/assets/F0B25DA8-A76C-4387-A611-3B7FA2E72F3C.svg'
      })
  }


init() {

  this.geolocation.getCurrentPosition().then((res) => {
    // resp.coords.latitude
    // resp.coords.longitude
    this.map =  new google.maps.Map(this.mapRef.nativeElement, { 
      center:{lat:res.coords.latitude, lng:res.coords.longitude},
      mapTypeId: 'roadmap',
      zoom:10
    });
    
    const location = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);

    this.addMarker(location, this.map)

    this.addHubsToMap(res.coords.latitude, res.coords.longitude)
    
   }).catch((error) => {
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
  }



  addHubsToMap(lat, lng) {
      console.log(lat, lng)
    /* const map = new google.maps.Map(this.mapRef.nativeElement, { 
      center:{lat, lng},
     // mapTypeId: google.maps.MapTypeId.ROADMAP,
     mapTypeId: 'roadmap',
      mapTypeControl: false,
      zoom:10
    }); */

    const hubs = [
      {
        name: 'Ikeja',
        address: 'No 1 Regina Omolara street Off Agbaoku Street,Opebi lagos Ikeja',
        coordinate: {lat:6.5960857, lng: 3.3573389}
      },
      {
        name: 'Benin',
        address: '108 Namula str opp  Ground foundation group sch off limot road off Sapele road Benin',
        coordinate: {lat:6.430233, lng:3.411553}
      },
      {
        name: 'Port Harcourt',
        address: 'Plot 4CUnity streeet off Iwowari Avenue off Peter Odili road Trans amadi',
        coordinate: {lat:4.793881, lng:7.037801}
      }
    
    ];

    hubs.forEach((hub) => {


      const marker = new google.maps.Marker({
        map:this.map,
        position: new google.maps.LatLng(hub.coordinate.lat, hub.coordinate.lng),
        title: hub.name,
       // icon: 'https://cdn.zeplin.io/5c6d4f6b6f0f43465e306384/assets/DB4B568B-6BCE-4E0A-A6E0-CA264C0C10B7.svg'
        
      })

      const infoWindow = new google.maps.InfoWindow();
      // Allow each marker to have an info window
      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.setContent(hub.address);
        infoWindow.open(this.map, marker);
      })
      

    })
  }



 

}
