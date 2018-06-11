import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { UserInfoPage } from "../user-info/user-info";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { LoginPage } from "../login/login";
import { App } from "ionic-angular";


@Component({
  selector: 'page-contact',
  templateUrl: 'my.html'
})
export class MyPage {

  public userData={};

  public UserInfoPage=UserInfoPage;

  constructor(public navCtrl: NavController,
              public localstorage: LocalStorageProvider,
              public alertCtrl: AlertController,
              public app: App) {

  }

  ionViewDidLoad(){
    this.userData=this.localstorage.get('user');
    console.log(this.userData)
  }

  logout(){

    let alert = this.alertCtrl.create({
      title:'提示',
      message:'确定退出登录？',
      buttons:[
        {
          text:'取消',
          role:'取消',
          handler: ()=>{

          }
        },
        {
          text:'确定',
          role:'确定',
          handler: ()=>{
            this.localstorage.remove('user');
            this.localstorage.remove('token');
            this.app.getRootNav().push(LoginPage);
          }
        }
      ]
    });
    alert.present();


  }

}
