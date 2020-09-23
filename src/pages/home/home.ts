import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { MposProvider } from '../../providers/mpos/mpos';
import 'rxjs/add/observable/interval';
import { Subscription, Observable } from 'rxjs';

declare global {
  interface Window {
    getMposInfo: (data: any) => void;
    dataPOS: any;
    payLoad: any;
  }
}

/**
 *
 * Conecto MPOS: onRequestQposConnected
 * Desconecto MPOS: onRequestQposDisconnected
 * Preparar MPOS chip/banda: please insert/swipe/tap card
 * Obtener Card MPOS banda: swipe card:
 *
*/
window.getMposInfo = function (data) {
  window.dataPOS = data;
  window.payLoad = data;
  console.log('data ts: ', data);
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  list: Array<any> = [];

  cardInfo:any;
  sub: Subscription;

  onQposConnected = false; //Conecto MPOS:
  onQposDisconnected = false; //Desconecto MPOS:
  onQposTransaction = false; //Preparar MPOS chip/banda:
  onQposCardInfo = false; //Obtener Card MPOS banda:

  constructor(public navCtrl: NavController, private btSerial: BluetoothSerial, public alert: AlertController, public plt: Platform,
              private mpos: MposProvider ) {}

  searchBt() {
    this.plt.ready().then(() => {
      this.btSerial.list().then(data => {
        // console.log('Dispositivos: ', data);
        this.list = data;
      }).catch(error => {
        console.log('Error al listar: ', error);
        console.log('Error al listar: ', JSON.stringify(error));
      })
    })
  }

  connect ({name, address}) {
    const mac = `${name}(${address})`;
    console.log('Mac Mpos: ' ,mac)
    
    this.mpos.connectBluetoothDevice((data: any)=> {
      // this.alert.create({ title: 'Conexión Exitosa', buttons:['Ok'] }).present();
      // console.log(data)
    },(error:any) => {
      // this.alert.create({ title:"Conexión Fallida", message: error ,buttons:['Ok']}).present();
      // console.log(error)
    },
      true, mac
    )

    this.obserSteps();
  }

  showInfo() {
    this.mpos.doTrade((data: any) => {
      this.navCtrl.push('CardDetailsPage', {data});
      // console.log('Data doTrade ts: ', data);
      // console.log('Get Card Fn doTrade:', cardMPOS);
    },(error: any) => {
      console.log(error)
      this.alert.create({ title:"Conexión Fallida", message: error ,buttons:['Ok']}).present();
    },
      30
    );
  }

  asingCard() {
    this.cardInfo = window.dataPOS;
  }

  getQposInfo() {
    this.mpos.getQposInfo((data: any) => {
      console.log('pos info: ', data)
    }, (error: any) => {
      console.log('pos info error: ', error)
      this.alert.create({ title:"Error getQposInfo", message: error ,buttons:['Ok']}).present();
    })
  }

  getQposId() {
    this.mpos.getQposId((data: any) => {
      console.log('posFun id: ', data)
    }, (error: any) => {
      console.log('posFun id error: ', error)
      this.alert.create({ title:"Error getQposId", message: error ,buttons:['Ok']}).present();
    })
  }

  showAlert(msg: string) {
    this.alert.create({ title: msg, buttons:['Ok'] }).present();
  }

  obserSteps() {
    this.sub = Observable.interval(3000).subscribe(() => { 
      if (window.payLoad != undefined) {
        window.payLoad.startsWith('swipe card:') ? window.payLoad = 'getCard' : window.payLoad;
        console.log('get data in TS Card: ', window.payLoad);
      } else {
        console.log('payLoad esta indefinido');
      }

      if (window.payLoad == 'onRequestQposConnected' && !this.onQposConnected) {
        this.onQposConnected = true;
        console.log('Conexión Exitosa');
        this.showAlert('Conexión Exitosa');
      } else if (window.payLoad == 'onRequestQposDisconnected' && !this.onQposDisconnected) {
        this.onQposDisconnected = true;
        console.log('Se desconecto el Mpos');
      } else if (window.payLoad == 'please insert/swipe/tap card' && !this.onQposTransaction) {
        this.onQposTransaction = true;
        console.log('Insertando tarjeta');
      } else if (window.payLoad == 'getCard' && !this.onQposCardInfo) {
        console.log('Info Card MPOS:', window.dataPOS);
        this.asingCard();
        this.stopObserSteps();
        this.showAlert('Tarjeta Aceptada');
      } else {
        console.log('ninguna acción');
      }
    });
  }
  
  stopObserSteps() {
    this.sub.unsubscribe();
  }

  // scanPosTOMode() {
  //   this.mpos.scanQPos2Mode((data: any) => {
  //     console.log('scanPosTOMode')
  //     console.log(data);

  //     this.mpos.connectBluetoothDevice((data:any)=> {
  //       console.log(data)
  //     },(error:any) => {
  //       console.log(error)
  //     },
  //       true, data
  //     )
  //   }, (error:any) => {
  //     this.alert.create({ title:"Error scanPosTOMode", message: error ,buttons:['Ok']}).present();
  //     console.log('not scanned: ', error)
  //   })
  // }

  // updateEmv () {
  //   console.log('update emv button clicked')
  //   this.mpos.updateEmvApp((data) => {console.log(data)}, ()=> {})
  // }

  // updateEmvConfig() {
  //   console.log('update emv config button clicked')
  //   this.mpos.updateEmvConfig(() => {}, () =>{});
  // }

  // set() {
  //   this.mpos.setCardTradeMode().then( data => {
  //     console.log(data)

  //   }, error => {
  //     console.log(error)
  //   })
  // }

}


