import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";

/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  public userData={};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public localStorage: LocalStorageProvider,
              public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad UserInfoPage');

    this.userData = this.localStorage.get('user');

    console.log(this.userData);
  }

  // ChangeName(){
  //   let alert = this.alertCtrl.create({
  //     title:'<div class="alertName"><span (click)="closed()" item-left>×</span><p>姓名</p><span>保存</span></div>',
  //     inputs:[
  //
  //     ]
  //   })
  //
  //   alert.present();
  // }

}
