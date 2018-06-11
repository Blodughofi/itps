import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackButtonProvider } from "../providers/back-button/back-button";

import { TabsPage } from '../pages/tabs/tabs';

import { LoginPage } from "../pages/login/login";
//import { Storage } from "@ionic/storage";
import { LocalStorageProvider } from "../providers/local-storage/local-storage";

declare var screen:any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;


  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              public localstorage:LocalStorageProvider,
              public backButton: BackButtonProvider) {

    if (!this.isLogin()) {
      this.rootPage = LoginPage;
    }

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      screen.orientation.lock('portrait-primary');
      this.backButton.registerBackButtonAction();
    });
  }

  isLogin(){


    if(this.localstorage.get('user')){
      console.log(this.localstorage.get('user'));
      return true;
    }else{
      console.log(this.localstorage.get('user'));
      return false;
    }

  }
}
