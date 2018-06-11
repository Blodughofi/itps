import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ConfigProvider} from "../../providers/config/config";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { BaseUI } from "../../common/baseUI";

declare var screen:any;
/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage extends BaseUI{

  public id:any;
  public historyList=[];

  public h:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: ConfigProvider,
              public screenOrientation: ScreenOrientation,
              public loadingCtrl: LoadingController) {

    super();

    this.id=this.navParams.get('id');
     this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);


  }

  ionViewDidEnter() {

    this.getHistoryList();

  }

  ionViewDidLeave(){
     this.screenOrientation.unlock();
      screen.orientation.lock('portrait-primary');
  }

  getHistoryList(){

    let loading=this.showLoading(this.loadingCtrl,'加载中...');

    let httpParams = {
      "data":{"caseId":this.id}
    };

    this.config.getApiHistory(httpParams)
      .subscribe(req=>{
        console.log(req);
        this.historyList=req['data']['opinions'];
        let num=this.historyList.length+1;
        this.h=(60*num)+'px';

        loading.dismissAll();
        console.log(this.h);
      },error=>{
        console.log(error);
      })

  }

}
