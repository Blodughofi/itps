import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ToastController,App,Platform,Keyboard} from "ionic-angular";


/*
  Generated class for the BackButtonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BackButtonProvider {

  constructor(public http: HttpClient,
              //public appCtrl: App,
              public toastCtrl: ToastController,
              public platform: Platform,
              public keyboard: Keyboard,
              public app:App) {
    //console.log('Hello BackButtonProvider Provider');
  }

  // registerBackButtonAction(tabRef: Tabs):void{
  //   this.platform.registerBackButtonAction()
  // }
  registerBackButtonAction() {
    this.platform.registerBackButtonAction(() => {

      if (this.keyboard.isOpen()) {
        this.keyboard.close();
        return;
      }

      const overlay = this.app._appRoot._overlayPortal.getActive();
      if(overlay && overlay.dismiss) {
        overlay.dismiss();
        return;
      }

      const nav = this.app.getActiveNav();
      let activeVC = nav.getActive();
      let page = activeVC.instance;

      // console.log(page);
      // debugger;

      // if (page instanceof IonTabsPage) {
      //   this.app.goBack();
      //   return;
      // }

      if(nav.canGoBack()){
        nav.pop();
      } else {
        this.showExit();
      }
    });
  }



//双击退出提示框
  backButtonPressed: boolean = false;
  showExit() {
    if (this.backButtonPressed) { //当触发标志为true时，即2秒内双击返回按键则退出APP
      this.platform.exitApp();
    } else {
      //this.showToast('再按一次退出应用');
      this.backButtonPressed = true;
      setTimeout(() => { //2秒内没有再次点击返回则将触发标志标记为false
        this.backButtonPressed = false;
      }, 2000)
    }
  }

}
