import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private cardIO: CardIO) {
  }


  scan() {
    this.cardIO.canScan()
    .then(
      (res: boolean) => {
        if(res){
          let options = {
            requireExpiry: true,
            requireCVV: false,
            requirePostalCode: false
          };
          this.cardIO.scan(options).then(data => {
            console.log(data);
          })
        }
      }
    );
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
  }

}
