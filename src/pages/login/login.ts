import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { ConfigProvider } from "../../providers/config/config";
import { HttpClient,HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { TabsPage } from "../tabs/tabs";
import { Storage } from "@ionic/storage";
import { App } from "ionic-angular";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { BaseUI } from "../../common/baseUI";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Injectable()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI{

  account:any;

  password:any;

  adress:any;
  option:any;
  select:any;

  url:any;
  path:any;

  public urlList=[];

  public isHadAdress = false;

  public error=false;
  public diss=true;

  public errorMessage='';

  f={};

  //账号或密码输入错误，请重新输入



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: ConfigProvider,
              public http: HttpClient,
              public storage: Storage,
              public localstorage: LocalStorageProvider,
              public toastCtrl: ToastController,
              private app: App) {

    super();

    if(this.localstorage.get('account')){
      this.account=this.localstorage.get('account');
    }

    if(this.localstorage.get('url')){
      this.url=this.localstorage.get('url');
      this.isHadAdress=!this.isHadAdress;
      this.config.url=this.adress;
    }
  }

  onChanged(){

    //this.path=this.url;
    this.adress=this.url;
    this.option='';

    this.localstorage.set('url',this.adress);

    //console.log(this.config.apiUrl);
  }

  login(){

    if(!this.account){
      this.error=true;
      this.errorMessage='没有输入账号';
      return false;
    }else if(!this.password){
      this.error=true;
      this.errorMessage='没有输入密码';
      return false;
    }else if(!this.adress){
      this.error=true;
      this.errorMessage='没有输入服务器地址'
      return false;
    }



    //console.log(apiUrl);

    //let httpParams= new HttpParams().set('account',this.account).set('password',this.password);



    this.config.login(this.account,this.password,this.adress)
      .subscribe( req => {
        console.log(req);

          if(req['code'] == 200){
            this.loginOnSuccess();
            let data=req['data']['user'];

            if(!this.localstorage.get('url')){
              this.localstorage.set('url',this.adress);
              this.config.url=this.adress;
            }

            if(this.urlList){
              for(var i=0; i<this.urlList.length; i++){
                if(this.urlList[i]!=this.adress){
                  this.urlList.push(this.adress);
                }
              }
            }else{
              this.urlList.push(this.adress);
            }



            this.config.url=this.adress;

            let token=req['data']['token'];
            this.localstorage.set('user',data);
            this.localstorage.set('token',token);
            this.localstorage.set('account',data['account']);
            console.log(data);
            console.log(token);
          }else{
            this.error=true;
            this.errorMessage='账号或密码输入错误，请重新输入';
          }
        },error =>{
          this.error=true;
        this.errorMessage='账号或密码输入错误，请重新输入';
          console.log(error);
        });

    // this.config.getApiGetLogin(this.account,this.password)
    //   .subscribe(req => {
    //     console.log(req);
    //
    //     if(req['code'] == 200){
    //       this.loginOnSuccess();
    //       let data=req['data']['user'];
    //
    //       let token=req['data']['token'];
    //       this.localstorage.set('user',data);
    //       this.localstorage.set('token',token);
    //       this.localstorage.set('account',data['account']);
    //       console.log(data);
    //       console.log(token);
    //     }else{
    //       this.error=true;
    //       this.errorMessage='账号或密码输入错误，请重新输入';
    //     }
    //   },error =>{
    //     this.error=true;
    //     this.errorMessage='账号或密码输入错误，请重新输入';
    //     console.log(error);
    //   })
  }

  loginOnSuccess(){
    this.app.getRootNav().setRoot(TabsPage);
  }

  ionSelec(){
    this.adress='';
  }

  onClickSelect(){
    if(!this.url){
      this.diss = false;
      let toast=this.showToast(this.toastCtrl,'暂无服务器地址可供选择');
      toast.dismissAll();
      return false;
    }
  }

  shan(){

    this.option=null;
    this.select=false;
    console.log(this.url);
    setTimeout(()=>{
      this.adress=this.url;
    },1000)
  }
}
