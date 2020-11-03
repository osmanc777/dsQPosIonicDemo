import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
// import { MapsPage } from '../pages/maps/maps';
import { Geolocation } from '@ionic-native/geolocation';
import { CardIO } from '@ionic-native/card-io';
import { MposProvider } from '../providers/mpos/mpos';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    // MapsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    // MapsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    Geolocation,
    CardIO,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MposProvider
  ]
})
export class AppModule {}
