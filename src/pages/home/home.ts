import { Component } from '@angular/core';
import { NavController, AlertController, Platform, ToastController } from 'ionic-angular';
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
  // console.log('data ts: ', data);
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  list: Array<any> = [];
  cardInfo:any;
  sub: Subscription;
  showCard:boolean = false;
  cardDetail:any;

  paramPos: any;

  onQposConnected = false; //Conecto MPOS:
  onQposDisconnected = false; //Desconecto MPOS:
  onQposBadSwipe = false; //no reconocio la tarjeta swipe MPOS:
  onQposNoCard = false; //no detecto ninguna tarjeta:
  onQposTransaction = false; //Preparar MPOS chip/banda:
  onQposCardInfo = false; //Obtener Card MPOS banda:
  
  onQposTranChip = false; //inserto CardChip: icc_card_inserted/EMV_ICC_Start
  onQposTranChipWait = false; //inserto CardChip: please wait..
  onQposTranChipRead = false; //leyendo CardChip: processing...
  onQposTranChipRemove = false; //remover CardChip:remove card
  resChip = false; //respuesta chip

  objectCardData: any = {};

  constructor(public navCtrl: NavController, private btSerial: BluetoothSerial, public alert: AlertController, public plt: Platform,
              private mpos: MposProvider, public toastCtrl: ToastController) {}

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
    this.resChip = false;
    this.paramPos = '';
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
    this.resChip = false;
    this.paramPos = '';
  }

  asingCard() {
    this.showCard = true;
    this.cardInfo = this.objectCardData;
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

  showAlert(title :string ,msg: string) {
    this.alert.create({ title: title, message: msg, buttons:['Ok'] }).present();
  }

  presentToastInfo(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'bottom'
    });
    toast.present();
  }

  obserSteps() {
    this.sub = Observable.interval(1000).subscribe((val) => {
      this.paramPos = window.payLoad;

      if (this.paramPos != undefined) {
        this.paramPos.startsWith('swipe card:') ? this.paramPos = 'getCard' : this.paramPos;
        console.log('get data in TS Card: ', this.paramPos);
      } else {
        console.log('payLoad esta indefinido');
      }

      console.log('*-----------*------------*---------------*');
      console.log('ParamPOS:',this.paramPos);
      console.log('*-----------*------------*---------------*');

      if (this.paramPos === 'onRequestQposConnected' && !this.onQposConnected) {
        this.onQposConnected = true;
        // console.log('Conexión Exitosa');
        this.presentToastInfo('Conexión Exitosa');

      } else if (this.paramPos === 'onRequestQposDisconnected' && !this.onQposDisconnected) {
        this.onQposDisconnected = true;
        this.showAlert('MPOS desconectado', 'Vuelve a conectar el MPOS para cobrar');
        this.stopObserSteps();

      } else if (this.paramPos === 'please insert/swipe/tap card' && !this.onQposTransaction) {
        this.onQposTransaction = true;
        this.presentToastInfo('MPOS listo para cobrar');
        // console.log('Insertando tarjeta');

      } else if (this.paramPos === 'bad_swipe' && !this.onQposBadSwipe) {
        this.onQposBadSwipe = true;
        // console.log('No se reconocio la tarjeta vuelve a intentar');
        // this.showAlert('Error Swipe', 'Vuelve a ingresar la tarjeta');
        this.presentToastInfo('No se reconocio la tarjeta, vuelve a intentar');

      } else if (this.paramPos === 'no_card_detected' && !this.onQposNoCard) {
        this.onQposNoCard = true;
        // console.log('No se detecto ninguna tarjeta:');
        this.showAlert('Error en Tarjeta', 'No se reconocio la tarjeta, vuelve a ingresarla');

      } else if (this.paramPos == 'getCard' && !this.onQposCardInfo) {
        this.onQposCardInfo = true;
        // console.log('Info Card MPOS:', this.paramPos);
        this.showAlert('Tarjeta Aceptada', 'Acepta para realizar el cobro');
        this.parseCard(window.dataPOS);
        this.asingCard();
        this.stopObserSteps();

      } 
      
      else if (this.paramPos === 'icc_card_inserted/EMV_ICC_Start' && !this.onQposTranChip) {
        this.onQposTranChip = true;
        console.log('inserto el chip de latarjeta:');
        this.presentToastInfo('Tarjeta Insertada');

      } 
      
      // else if (this.paramPos === 'please wait..' && !this.onQposTranChipWait) {
      //   this.onQposTranChipWait = true;
      //   console.log('leyendo tarjeta');
      //   this.presentToastInfo('Reconociendo tarjeta...');

      // } else if (this.paramPos === 'processing...' && !this.onQposTranChipRead) {
      //   this.onQposTranChipRead = true;
      //   console.log('Procesando tarjeta');
      //   this.presentToastInfo('Procesando tarjeta...');

      // } else if (this.paramPos === 'remove card' && !this.onQposTranChipRemove) {
      //   this.onQposTranChipRemove = true;
      //   console.log('Retira la tarjeta');
      //   this.presentToastInfo('Puedes retirar la tarjeta');

      // } else if (this.onQposTranChip && this.onQposTranChipWait && this.onQposTranChipRead && this.onQposTranChipRemove && !this.resChip) {
      //   this.resChip = true;
      //   console.log('Respuesta del Chip');
      //   this.showAlert('Tarjeta Aceptada Chip', 'Acepta para realizar el cobro');
      //   this.parseCard(window.dataPOS);
      //   this.asingCard();
      //   this.stopObserSteps();

      // } 
      
      else {
        console.log('ninguna acción: ', val);
        // console.log('onQposTranChip: ', this.onQposTranChip);
        // console.log('onQposTranChipWait: ', this.onQposTranChipWait);
        // console.log('onQposTranChipRead: ', this.onQposTranChipRead);
        // console.log('onQposTranChipRemove: ', this.onQposTranChipRemove);
        // console.log('resChip: ', this.resChip);
      }
    });
  }
  
  stopObserSteps() {
    this.sub.unsubscribe();
  }

  parseCard(card: any) {
    this.cardDetail = card.split(',');
    this.cardDetail.forEach((element: any) => {
      let propiedad = element.split('_').shift();
      let valor     = element.substring(element.indexOf('_') + 1);

      this.objectCardData[propiedad] = valor.trim();
    });

    console.log('************ card detail *****************');
    console.log(this.objectCardData);
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


