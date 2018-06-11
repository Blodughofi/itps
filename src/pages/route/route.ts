import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { ImagePicker,ImagePickerOptions } from "@ionic-native/image-picker";
import { ConfigProvider } from "../../providers/config/config";
import { HistoryPage } from "../history/history";
import { DatePicker } from "@ionic-native/date-picker";
import { BaseUI } from "../../common/baseUI";
import {CameraOptions} from "@ionic-native/camera";
import { Camera } from "@ionic-native/camera";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery";
import { PhotoViewer } from "@ionic-native/photo-viewer";

/**
 * Generated class for the RoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
})
export class RoutePage extends BaseUI{

  public files=[];
  public list=[];
  public attachement=[];

  public data={};

  public readonly=false;

  public options=true;

  public isTrue=false;

  public sfhg='是';

  public id='';
  public name='';
  public region='';
  public text='';
  public dept='';
  public ins_user='';
  public item='';
  public batch=false;

  public datatime:any;

  public fileList=[];

  public dicList=[];

  public subTableList=[];

  public status=1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public imagePicker: ImagePicker,
              public config: ConfigProvider,
              private datePicker:DatePicker,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              public camera: Camera,
              public base64ToGallery: Base64ToGallery,
              public photoViewer: PhotoViewer,
              public toastCtrl: ToastController) {

    super();

    this.id=this.navParams.get('id');
    this.status=this.navParams.get('status');
    if(this.status==2){
      this.readonly=true;
    }



  }

  ionViewDidEnter() {

    this.getRouteList();

    //this.datatime=null;
  }

  getImages(){

    const options: ImagePickerOptions={
      maximumImagesCount: 6,
    };

    this.imagePicker.getPictures(options).then((res) => {
      for(var i =0; i<res.length; i++){
        this.files.push(res[i]);
      }
    })

  }

  getRouteList(){

    let loading=this.showLoading(this.loadingCtrl,'加载中');

    let httpParams={
      "data":{
        "taskId":this.id
      }
    };

    this.config.getApiRouteList(httpParams)
      .subscribe(req=>{

        console.log(req);

        if(req['code']==200){
          this.data=req['data']['caseData'];
          this.fileList=req['data']['caseData']['attachment'];
          this.name=this.data['name'];
          //this.region=this.data['region'];
          this.subTableList=this.data['subTableList'];
          this.data['xjsj']=new Date().toLocaleString();
         // this.getRouteRegionList();

          loading.dismissAll();
        }
      })

  }

  getRouteRegionList(){

    //let loading=this.showLoading(this.loadingCtrl,'加载中');

    let httpParams={
      "data":{"nodeKey":"xjqy"}
    };

    this.config.getApiRouteRegion(httpParams)
      .subscribe(req=>{
        console.log(req);
        if(req['code']==200){
          console.log(httpParams);
          this.dicList=req['data']['dicList'];
          console.log(this.dicList);
          //loading.dismissAll();
        }
      },error=>{
        console.log(error);
      })

  }

  showTime(){
    this.datePicker.show({
      date: new Date(),
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK,
      is24Hour: true,
    }).then(
      date =>{
        console.log(date);
        this.datatime=date;
        //this.datatime=new Date();
        this.data['xjsj']=date.toLocaleString();
        //this.datatime=date;
      })
  }

  goHistory(){
    this.navCtrl.push(HistoryPage,{id:this.id});
    console.log(this.id);
  }

  changeResolte(event,index){
    console.log(event);
    this.data['subTableList'][index]['result']=event;
  }

  gotoPush(){

    let alert = this.alertCtrl.create({
      title:'提示',
      message:'确定要提交吗？',
      buttons:[
        {
          text:'取消',
          role:'取消',
          handler: ()=>{

          }
        },
        {
          text: '确定',
          role: '确定',
          handler: () => {
            this.goto();
          }
        }
    ]
    });
    alert.present();

  }

  goto(){

    console.log(this.data);

    let attaData={
      "title":'',
      "content":''
    };

    if(this.status === 1){
      if(!this.datatime){
        let toast = this.showToast(this.toastCtrl,'没有填写时间');
        toast.dismissAll();
        return false;
      }
    }


    for(let i=0; i<this.fileList.length;i++){
      if(this.fileList[i]['data']){
        attaData['title']=this.fileList[i]['name'];
        attaData['content']=this.fileList[i]['data'];
        this.attachement.push(attaData);
      }

    }

    this.data['attachment']=this.attachement;

    let httpParams={
      "data":{
        "taskId":this.id,
        "caseData":this.data
      }
    };

    let httpParams2={
      "data":{
        "taskId":this.id,
        "caseData":{
          "sfhg":this.sfhg
        }
      }
    };

    console.log(httpParams);
    if(this.status==1){
      this.config.getApiPushTask(httpParams)
        .subscribe(req=>{
          console.log(req);
          if(req['code']==200){
            this.navCtrl.pop();
            console.log(httpParams);
          }
        },error=>{
          console.log(error);
        })
    }else{

      console.log(this.sfhg);
      this.config.getApiPushTask(httpParams2)
        .subscribe(req=>{
          console.log(req);
          if(req['code']==200){
            this.navCtrl.pop();
            console.log(httpParams);
          }
        },error=>{
          console.log(error);
        })
    }
  }

  saveRegion(){

    this.data['region']=this.text;
    this.batch=false;
    console.log(this.data);
  }

  clickRegion(region){
    this.text=region;
    console.log(this.text)

  }

  changeRegion(){
    this.batch=true;
  }

  closeBtn(){
    this.batch=false;
    this.text='';
  }

  push(){

  }

  openImgs(){
    let options: CameraOptions={
      quality:100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    console.log(2);




    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      console.log(1);

      let string='';

      this.base64ToGallery.base64ToGallery(imageData).then(
        res => {
          string=res.substring(29,res.length)
          console.log(string);

          let data={

            "data":imageData,

            "url":"data:image/jpeg;base64,"+imageData,
            "name": string,
            "note":''
          };
          this.fileList.push(data)

        },
        err => console.log('Error saving image to gallery ', err)
      );



    },error=>{console.log(error)})
  }

  downfile(id,name,ext,url,index){

    console.log(id);
    console.log(id);
    console.log(name);
    console.log(ext);

    if(id){
      if(ext=='png'||ext=='jpg'){
        this.onHold(url);
      }else{
        this.onHold2(url);
      }
    }else{
      this.onHold3(index);
    }


  }

  onHold3(index){
    let actionSheet = this.alertCtrl.create({
      title:'提示',
      buttons:[
        {
          text:'删除',
          role: 'destructive',
          handler: () => {
            this.fileList.splice(index,1);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  onHold2(url){
    this.alertActionSheet(url);
  }

  alertActionSheet(url){
    let actionSheet = this.alertCtrl.create({
      title: '提示',
      buttons: [
        {
          text: '下载',
          role: 'destructive',
          handler: () => {
            // 保存图片
            //this.photoViewer.show(imgUrl);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  onHold(url) {
    //alert('kkkkkkk');
    let imgSrc = url;
    this.presentActionSheet(imgSrc);
  }
  // 弹出选择框
  presentActionSheet(imgUrl:string) {
    let actionSheet = this.alertCtrl.create({
      title: '提示',
      buttons: [
        {
          text: '预览',
          role: 'destructive',
          handler: () => {
            // 保存图片
            this.photoViewer.show(imgUrl);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
