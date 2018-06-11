import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { ConfigProvider } from "../../providers/config/config";

/**
 * Generated class for the PersonsearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-personsearch',
  templateUrl: 'personsearch.html',
})
export class PersonsearchPage {

  public search:any;
  public searchList=[];

  public callback:any;
  public isHad=true;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: ConfigProvider,
              public alertCtrl:AlertController) {

    this.callback=this.navParams.get('callback');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonsearchPage');
  }

  cancel(){
    //this.navCtrl.pop();
    this.sendData('');
  }

  getSearchList(){

    let httpParams={
      "page":1,
      "pageSize":10,
      "data":{"searchKey":this.search}
    };

    this.config.getApiPersonSearch(httpParams)
      .subscribe(req=>{
        console.log(req);

        this.searchList = req['data']['users'];

        this.isHad=false;

        console.log(this.searchList)
      },error=>{
        console.log(error);
      })

  }

  saveName(user,index){
    let alert = this.alertCtrl.create({
      title:'提示',
      message:'是否添加人员：'+user+'?',
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
            this.sendData(this.searchList[index]);
          }
        }
      ]
    });
    alert.present();
  }

  sendData(data){
    this.callback(data).then( () => {
      this.navCtrl.pop()
    })
  }



  onSearchKeyUp(event){
    if("Enter"==event.key){
      //this.getUpData();
      this.getSearchList();
    }

    if(event.keywords===13){
      this.getSearchList();
    }
  }

}
