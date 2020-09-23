import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CardDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card-details',
  templateUrl: 'card-details.html',
})
export class CardDetailsPage {
  card: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('data'));
    this.card = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardDetailsPage');
  }

}
