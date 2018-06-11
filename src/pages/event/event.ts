import { Component,Input } from '@angular/core';
import {
  ActionSheetController, AlertController, IonicPage, LoadingController, NavController, NavParams,
  ToastController
} from 'ionic-angular';
import { ConfigProvider } from "../../providers/config/config";
import { PersonsearchPage } from "../personsearch/personsearch";
import { HistoryPage } from "../history/history";
import {BaseUI} from "../../common/baseUI";
import { FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { Camera, CameraOptions} from "@ionic-native/camera";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { Platform } from "ionic-angular";
import { FileChooser } from "@ionic-native/file-chooser";
import { IOSFilePicker } from "@ionic-native/file-picker";
import { ImagePicker } from "@ionic-native/image-picker";
import { ImgServiceProvider } from "../../providers/img-service/img-service";
//import { FileOpener } from "@ionic-native/file-opener";
import { ImgerProvider } from "../../providers/imger/imger";
import {$PLUS} from "@angular/compiler/src/chars";
import { DatePicker } from "@ionic-native/date-picker";
import { TodoListPage } from "../todo-list/todo-list";
import { PhotoLibrary } from "@ionic-native/photo-library";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { ArrayBuffer } from "@angular/http/src/static_request";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery";

//import { FileOpener } from '@ionic-native/file-opener';
//import { Transfer, TransferObject } from '@ionic-native/transfer';
//import { TransferState} from "@angular/platform-browser";
//import { FileTransfer} from "@ionic-native/file-transfer";

/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

@IonicPage()
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage extends BaseUI{


  public view='';

  public string='';

  public assigneeuser='';
  public assigneeId='';
  public assigneeName='';

  public anthor=false;
  public jpg=false;

  public returnBtn=false;

  public index=0;

  public oipitionMessage='填写转交原因';

  public attachment=[];

  public username='';
  public account='';
  public time='';
  public id:any;
  public eventData:any;
  public list=[];
  public cause='';
  public solution='';
  public firstcause='';
  public firstsolution='';
  public secondcause='';
  public secondsolution='';
  public threecause='';
  public threesolution='';
  public user='';
  public final=false;
  public choosen=false;
  public exectorHad=false;
  public exectorList=[];
  public exector='';
  public userId=null;
  public region=null;
  public taskId='';
  public status='';
  public eventType='';
  public destNodeId='task3';
  public handle1=false;
  public handle2=false;
  public handle3=false;
  public way='默认派单';
  targetUser:any;
  adress:any;
  bool:boolean;
  public specail=false;
  public show1=true;

  public second=false;
  public three=false;

  public ismajor:any;

  public targetNodeUser:any;

  public errorMessage:any;
  public show2=false;
  public show3=false;
  public showFinal=false;

  public revisitStatus='成功解决';
  public revisitComment='';
  public closeCode='成功';
  public closeComment='';
  public revisitScore='满意';
  public caseType='事件';
  public knowledge='1';
  public closeTime:any;
  public fileList=[];
  public targetNodeUserList=[];
  public resolvetypeid='';
  public resolvebyid='';

  public showJpg='assets/imgs/默认文件图标.png';

  public destNodeUsers=[];

  public name='事件经理';

  public lasttime:any;//new Date().valueOf();

  public customer='';

  public arr=[];

  public attachement = [];

  message='提示';

  anthorMessage='请选择转交人员';

  public isassigner=false;
  public isoipition=false;
  public isanthor=true;




  // private String revisitStatus;//回访状态
  // private String revisitScore;//满意度
  // private String isClosed;//是否关闭
  // private String closeCode;//关闭代码
  // private String revisitComment;//反馈意见
  // private String closeComment;//处理结果
  // private String caseType;//工单类型
  // private String knowledge;//生成知识
  // private String closeTime;//关闭时间

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public config: ConfigProvider,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              private transfer: FileTransfer,
              private platform: Platform,
              private fileChooser: FileChooser,
              private filePicker: IOSFilePicker,
              private imagePicker:ImagePicker,
              //private fileOpener: FileOpener,
              public file: File,
              public loadingCtrl:LoadingController,
              public imgService:ImgServiceProvider,
              public imager:ImgerProvider,
              private camera:Camera,
              public localStorage:LocalStorageProvider,
              public datePicker : DatePicker,
              public photoLibrary:PhotoLibrary,
              public photoViewer: PhotoViewer,
              public base64ToGallery: Base64ToGallery,
              public actionSheetCtrl: ActionSheetController,
              ) {
    super();

    this.id = this.navParams.get('id');
    this.status = this.navParams.get('status');



    this.handle1=this.handle2=this.handle3=false;

    if(this.status == '事件经理'){
      this.show2=true;
      this.show3=true;
      this.show1=false;
      this.showFinal=true;
      this.second=true;
      this.three=true;
      this.isanthor=false;
      this.returnBtn=true;
    }

    if(this.status == '服务受理'){
      this.specail=false;
    }

    if(this.status == '一线'){
      this.handle1=true;
      this.show2=false;
      this.show3=false;
      this.show1=true;
    }

    if(this.status == '二线'){
      this.handle2=true;
      this.returnBtn=true;
      this.show2=true;
      this.second=false;
      this.show1=false;

    }

    if(this.status == '三线'){
      this.handle3=true;
      this.returnBtn=true;
      this.show2=true;
      this.show3=true;
      this.second=true;
      this.three=false;
      this.show1=false;
    }

    console.log(this.status);

    console.log(this.show2);
    console.log(this.show3);


    //this.getEventList();

  }

  // ionViewWillEnter(){
  //
  //   this.getEventList();
  //
  // }



  ionViewDidEnter() {


    if(!this.eventData){

      this.getEventList();

    }


  }

  gotoHistoryPage(){
    this.navCtrl.push(HistoryPage,{
      id: this.taskId
    });
  }

  getEventList(){

    let loading=this.showLoading(this.loadingCtrl,'加载中');

    let httpParams = {
      "data":{"taskId":this.id}
    };


    loading.present().then(()=>{


    this.config.getApiEventList(httpParams)
      .subscribe(req=>{

        console.log(req);

        if(req['code'] == 200){
          this.eventData=req['data']['caseData'];
          //this.attachment=this.eventData['attachement'];
          this.firstcause=this.eventData['cause'];
          this.firstsolution=this.eventData['solution'];
          this.secondcause=this.eventData['secondcause'];
          this.secondsolution=this.eventData['secondsolution'];
          this.threecause=this.eventData['threecause'];
          this.threesolution=this.eventData['threesolution'];

          this.arr=req['data']['targetNodeUser'];

          for(var i=0; i<this.arr.length;i++){
            if(this.arr[i]['nodeName']==this.name){
              this.index=i;
            }
          }

          console.log(this.eventData);

          if(this.list.length<=0){
            this.list.push(req['data']['caseData']);
          }

          this.taskId=req['data']['caseData']['id'];

          this.username=req['data']['user']['fullname'];

          this.adress=req['data']['caseData']['resolvetype'];

          this.bool=req['data']['caseData']['isresolved'];

          this.user=req['data']['caseData']['resolveby'];

          this.resolvebyid=req['data']['caseData']['resolvebyid'];

          this.ismajor=req['data']['caseData']['ismajor'];
          //fileList

          this.fileList=req['data']['caseData']['attachement'];

          for(let i=0;i<this.fileList.length;i++){
            if(this.fileList[i].ext=='png'||this.fileList[i].ext=='jpg'){
              let url =this.config.getApiFile(this.fileList[i]['id']);
              this.fileList[i]['url']=url;
            }else{
              this.fileList[i]['url']='assets/imgs/默认文件图标.png';
            }
          }

          if(this.ismajor ==1){
            this.eventType='重大事件';
          }


          this.account=req['data']['user']['account'];

          this.time=req['data']['user']['assignTime'];

          this.targetNodeUserList=req['data']['targetNodeUser'];

          if(req['data']['targetNodeUser'].length!=0){
            this.targetNodeUser=req['data']['targetNodeUser'];
          }else{
            this.targetNodeUser=false;
          }



          console.log(req);
          console.log(this.fileList);

          this.specail=true;

          loading.dismissAll();
        }

      },error =>{
        console.log(error);
      });
    })
  }

  getData = (data) => {
    return new Promise((resolve,reject) => {

      if(data){
        let useInfo = data;
        this.user=useInfo.fullname;
      }else{
        this.user='';
      }

      console.log(this.list);
      resolve();
    })
  };

  getDataExecutor = (data) => {

    return new Promise((resolve,reject) => {

      if(data){
        let useInfo = data;
        // if(this.exectorList.length){
        //   for(let i=0; i<this.exectorList.length;i++){
        //     if(useInfo.fullName!==this.exectorList[i]){
        //       this.exectorList.push(useInfo.fullname);
        //     }else{
        //       let toast=this.showToast(this.toastCtrl,'不能重复选择');
        //       toast.dismissAll();
        //     }
        //   }
        // }else{
        //   this.exectorList.push(useInfo.fullname);
        // }

        this.exectorList.push(useInfo.fullname);

        console.log(data);
        console.log(this.exectorList);



        this.exector=this.exectorList.join(',');
        this.userId=useInfo.userId;
        this.customer=useInfo.customer;
        this.destNodeUsers.push(useInfo);
        console.log(this.destNodeUsers);
        this.exectorHad=true;
      }else{
        this.exector='';
      }
      resolve();
    })

  };

  goExecutor(){
    this.navCtrl.push(PersonsearchPage,{callback:this.getDataExecutor})
  }

  goPersonSearch(){

    console.log(this.list);

    this.navCtrl.push(PersonsearchPage,{callback:this.getData});
  }

  workPush(){
    this.choosen=true;
  }

  prePush(){
    this.choosen=false;
  }

  pushTask(){

    if(!this.cause){
      console.log('没有输入原因');
      this.errorMessage='没有输入原因';
      let toast=this.showToast(this.toastCtrl,this.errorMessage);

      toast.dismissAll();
      return false;

    }else if(!this.solution){
      console.log('没有解决方案');
      this.errorMessage='没有输入解决方案';

      let toast=this.showToast(this.toastCtrl,this.errorMessage);

      toast.dismissAll();
      return false;

    }else if(!this.adress){
      console.log('没有选择处理方式');
      this.errorMessage='没有选择处理方式';
      let toast=this.showToast(this.toastCtrl,this.errorMessage);

      toast.dismissAll();
      return false;
    }else if(!this.bool){
      console.log('没有说明是否解决');
      this.errorMessage='没有说明是否解决';
      let toast=this.showToast(this.toastCtrl,this.errorMessage);

      toast.dismissAll();
      return false;

    }else if(!this.way){
      console.log('没有选择派单方式');
      this.errorMessage='没有选择派单方式';
      let toast=this.showToast(this.toastCtrl,this.errorMessage);

      toast.dismissAll();
      return false;

    }else{
      this.errorMessage='成功';
    }

    let data:any;
    let dest:any;
    let httpParams={};


    let attaData={
      "title":'',
      "content":''
    };


    for(let i=0; i<this.fileList.length;i++){
      if(this.fileList[i]['data']){
        attaData['title']=this.fileList[i]['name'];
        attaData['content']=this.fileList[i]['data'];
        this.attachement.push(attaData);
      }

    }

    console.log(this.attachement);



    if(this.way=== "默认派单"){
      httpParams = {
        "data": {
          "taskId": this.id,
          "caseData": {
            "cause": this.cause,
            "isresolved": this.bool,
            "solution": this.solution,
            "resolvetype": this.adress,
            "resolveby": this.user,
            "resolvebyid": this.resolvebyid,
            "attachement": this.attachement
          }
        }
      }
    }else if(!this.customer){
      data=this.targetNodeUser[this.index]['taskExecutors'][0];
      dest={
        "destNodeId": this.destNodeId,
        "destNodeUsers":data

      };

      console.log(data);
      console.log(this.index);

    }else{
      dest={
        "destNodeId": this.destNodeId,
        "destNodeUsers":{
          "type":"user",
          "executeId":this.userId,
          "executor":this.exector
        }
      }
    }

    console.log(this.index);
    console.log(this.customer);

    console.log(this.targetNodeUser);

    console.log(data);




if(this.handle1&&this.way!== "默认派单"){
      httpParams = {
    "data":{
      "taskId":this.id,
      "caseData":{
        "cause":this.cause,
        "isresolved":this.bool,
        "solution":this.solution,
        "resolvetype":this.adress,
        "resolveby":this.user,
        "resolvebyid":this.resolvebyid,
        "attachement": this.attachement
      },
      "dest":dest
      // "dest": {
      //   "destNodeId": this.destNodeId,
      //   "destNodeUsers": data
      // },

    }

  };
}





    if(this.handle2&&this.way!== "默认派单") {
      httpParams = {
        "data": {
          "taskId": this.id,
          "caseData":{
            //"cause":this.firstcause,
            //"solution":this.firstsolution,
            "secondcause": this.cause,
            "secondsolution": this.solution,
            "resolvetype": this.adress,
            //"resolvetypeId": this.bool,
            "resolveby":this.user,
            "isresolved":this.bool,
            "resolvebyid":this.resolvebyid,
            "attachement": this.attachement
          },
          "dest": dest

        }
      }
    }

    if(this.handle3&&this.way!== "默认派单") {
      httpParams = {
        "data": {
          "taskId": this.id,
          "caseData":{
            "threecause": this.cause,
            "threesolution": this.solution,
            "resolvetype": this.adress,
            "resolveby":this.user,
            //"cause":this.firstcause,
            //"solution":this.firstsolution,
            //"secondcause": this.cause,
            //"secondsolution": this.solution,
            "isresolved":this.bool,
            "resolvebyid":this.resolvebyid,
            "attachement": this.attachement
          },
          "dest": dest

        }
      }
    }

    // private String revisitStatus;//回访状态
    // private String revisitScore;//满意度
    // private String isClosed;//是否关闭
    // private String closeCode;//关闭代码
    // private String revisitComment;//反馈意见
    // private String closeComment;//处理结果
    // private String caseType;//工单类型
    // private String knowledge;//生成知识
    // private String closeTime;//关闭时间




    console.log(httpParams);




    this.config.getApiPushTask(httpParams)
      .subscribe( req=>{
        console.log(req);

        if(req['code'] == 200){
          let toast=this.showToast(this.toastCtrl,this.errorMessage);

          toast.dismissAll();

          this.navCtrl.pop();

          console.log(httpParams);

        }
      },error=>{
        console.log(error);
      });





  }





  push(){
    let alert=this.alertCtrl.create({
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
          text:'提交',
          role:'提交',
          handler: ()=>{
            this.pushTask();
          }
        }
      ]
    });
    alert.present();
  }



  rejectTo(){
    let httpParams={
      "data":{
        "taskId":this.id,
        "opinion":this.view
      }
    };
    this.config.getApiTaskReject(httpParams)
      .subscribe(req=>{
        console.log(req);

        if(req['code'] == 200){


          this.navCtrl.pop();


        }
      },error=>{
        console.log(error);
      })
  }



  anotherPush(){
    console.log(this.cause);
    this.isassigner=true;
    this.oipitionMessage='填写转交原因';
  }

  goto($event){
    console.log(event);
    this.anthor=false;
  }

  return(){
    let alert=this.alertCtrl.create({
      title:'提示',
      message:'确认是否驳回',
      buttons:[
        {
          text:'取消',
          role:'取消',
          handler: ()=>{
          }
        },
        {
          text:'驳回',
          role:'驳回',
          handler: ()=>{
            //this.rejectTo();
            this.oipitionMessage='填写驳回原因';
            this.isoipition=true;

          }
        }
      ]
    });
    alert.present();
  }

  close(){


    let httpParams = {

      "data": {
        "taskId": this.id,
        "opinion": "OK",
        "revisitStatus": this.revisitStatus,
        "revisitScore": this.revisitScore,
        "isClosed": 1,
        "revisitComment": this.revisitComment,
        "closeComment": this.closeComment,
        "caseType": this.caseType,
        "knowledge": this.knowledge,
        "closeTime":   this.lasttime,
        "closeCode": this.closeCode,
        "resolveType": this.adress,
        "resolveby":this.user

      }
    };



    let alert=this.alertCtrl.create({
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
          text:'提交',
          role:'提交',
          handler: ()=>{
            this.config.getApiPushTask(httpParams)
              .subscribe(req => {
                console.log(req)
                console.log(httpParams);

                // if(!this.revisitComment){
                //   this.errorMessage='没有输入反馈意见';
                //   let toast=this.showToast(this.toastCtrl,this.errorMessage);
                //
                //   toast.dismissAll();
                //   return false;
                // }
                //
                // if(!this.closeComment){
                //   this.errorMessage='没有输入处理结果';
                //   let toast=this.showToast(this.toastCtrl,this.errorMessage);
                //
                //   toast.dismissAll();
                //   return false;
                // }

                if(req['code'] == 200){

                  this.errorMessage='关闭成功';
                  let toast=this.showToast(this.toastCtrl,this.errorMessage);

                  toast.dismissAll();

                  this.navCtrl.pop();


                }
              },error => {
                console.log(error);
              });
          }
        }
      ]
    });
    alert.present();
  }

  downfiles(id,name,ext,url){

    console.log(id);
    console.log(name);
    console.log(ext);
    console.log(url);

    const xhr = new XMLHttpRequest();

    //xhr.open("post",url);
    xhr.addEventListener('load',(ev) => {
      let blod = xhr.response;
      console.log(blod);

      if(blod){
        let path = this.file.externalDataDirectory;
        this.file.writeFile(path,name,blod,{
          replace: true
        }).then( () => {
          //window.cordova.plugins.FileOpener._canOpen()
          console.log(1);
          console.log('成功');
        }).catch(error=>{console.log(error)})
      }
    })

  }

  downfile(id,name,ext,url,index){

    console.log(url);
    console.log(id);
    console.log(name);
    console.log(ext);


       if(ext=='png'||ext=='jpg'){
         this.onHold(url,index);
       }else{
         this.onHold2(url);
       }



  }

  col(name,id,index){
    this.destNodeId=id;
    this.name=name;
    this.index=index;
    console.log(id);
    console.log(this.name);
    console.log(index);
  }


  upload(filepath){


    const fileTransfer:FileTransferObject = this.transfer.create();

    let fileType=this.getFileType(filepath);

    let fileName=this.getFileName(filepath);

    let fileMimeType=this.getFileMimeType(fileType);

    let options: FileUploadOptions={
      fileKey: 'file',
      fileName: fileName,
      mimeType: fileMimeType,
    };

    //let loading = this.loadingCtrl.create({})
  }

  getFileType(fileUrl: string): string {
    return fileUrl.substring(fileUrl.lastIndexOf('.') + 1, fileUrl.length).toLowerCase();
  }
  // 根据url获取文件名(包含文件类型)
  getFileName(fileUrl: string): string {
    return fileUrl.substring(fileUrl.lastIndexOf('/') + 1, fileUrl.length).toLowerCase();
  }
  getFileMimeType(fileType: string): string {
    let mimeType: string = '';
    switch (fileType) {
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'pptx':
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'zip':
        mimeType = 'application/x-zip-compressed';
        break;
      case 'rar':
        mimeType = 'application/octet-stream';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      default:
        mimeType = 'application/' + fileType;
        break;
    }
    return mimeType;
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
        this.closeTime=date;
        this.lasttime=date.valueOf();
        //this.datatime=date;
      })
  }

  getSearchData = (data) => {
    return new Promise((resolve,reject) => {


      if(data){
        console.log(data);
        let useInfo = data;
        this.assigneeuser=useInfo.fullname;
        this.assigneeName=useInfo.fullname;
        this.assigneeId=useInfo.userId;
      }else{
        this.assigneeuser='';
      }
      resolve();
    })
  };

  pushSearch(){
    this.navCtrl.push(PersonsearchPage,{callback:this.getSearchData});
  }

  pushAnthor(){
    if(!this.assigneeuser){
      let toast=this.showToast(this.toastCtrl,'没有选择转交对象');
      toast.dismissAll();
      return false;
    }
    //this.deliver();
    this.isassigner=false;
    this.isoipition=true;

  }

  changeClose(){
    this.isassigner=false;
    this.isoipition=false;
    this.assigneeuser='';

  }

  deliver(){
    let httpParams={
      "data":{
        "taskId":this.id,
        "assigneeId":this.assigneeId,
        "assigneeName":this.assigneeName,
        "opinion":this.view,
      }
    };
    this.config.getApiTaskDeliver(httpParams)
      .subscribe(req=>{
        if(req['code'] == 200){


          this.navCtrl.pop();

        }

      },error=>{
        console.log(error);
      })
  }

  saveOipition(){
    if(this.oipitionMessage=='填写驳回原因'){
      this.rejectTo()
    }else{
      this.deliver();
    }
  }

  closeBtn(){
    this.isassigner=false;
    this.isoipition=false;
    this.assigneeuser='';
    this.assigneeuser='';
    this.assigneeName='';
    this.assigneeId='';
    this.view='';
  }



  onHold2(url){
    this.alertActionSheet(url);
  }

  alertActionSheet(url){
    let actionSheet = this.actionSheetCtrl.create({
      title: '提示',
      buttons: [
        {
          text: '下载',
          role: 'destructive',
          handler: () => {
            //this.photoViewer.show(imgUrl);
          }
        },
        {
          text: '删除',
          handler: () => {
            //this.fileList.splice(index,1);
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

  onHold(url,index) {
    let imgSrc = url;
    this.presentActionSheet(imgSrc,index);
  }
  // 弹出选择框
  presentActionSheet(imgUrl:string,index) {

    let actionSheet = this.actionSheetCtrl.create({
      title: '提示',
      buttons: [
        {
          text: '预览',
          role: 'destructive',
          handler: () => {
            this.photoViewer.show(imgUrl);
          }
        },
        {
          text: '删除',
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

  saveImage(imgUrl) {
    cordova.plugins.photoLibrary.requestAuthorization(
      function () {
        // User gave us permission to his library, retry reading it!
        cordova.plugins.photoLibrary.getLibrary(
          function ({library}) {
            //var url = 'file:///...'; // file or remote URL. url can also be dataURL, but giving it a file path is much faster
            var album = 'myApp';
            cordova.plugins.photoLibrary.saveImage(imgUrl, album,
              function (libraryItem) {
                alert("保存成功"+libraryItem);
              }, function (err) {
                alert('保存失败'+err);
              });
          },
          function (err) {
            if (err.startsWith('Permission')) {
              // call requestAuthorization, and retry
            }
            // Handle error - it's not permission-related
            console.log('权限'+err);

          }
        );
      },
      function (err) {
        // User denied the access
        alert('用户拒绝访问'+err);
      }, // if options not provided, defaults to {read: true}.
      {
        read: true,
        write: true
      }
    );

  }

  ImgActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '提示',
      buttons: [
        {
          text: '相机',
          role: 'destructive',
          handler: () => {
            this.openCamera();
          }
        },
        {
          text: '相册',
          handler: () => {
            this.openImgs();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
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

      this.base64ToGallery.base64ToGallery(imageData).then(
        res => {
          this.string=res.substring(29,res.length);
          console.log(this.string);

          let data={

            "data":imageData,

            "url":"data:image/jpeg;base64,"+imageData,
            "name": this.string,
            "note":''
          };
          this.fileList.push(data);

        },
        err => console.log('Error saving image to gallery ', err)
      );



    },error=>{console.log(error)})
  }

  openCamera(){

    let options: CameraOptions={
      quality:100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    this.camera.getPicture(options).then((imageData) => {

      console.log(imageData);

    },error=>{console.log(error)})

  }



  openPics(){

    let options = {

      maximumImagesCount: 5,//选择一张图片
      width: 800,
      height: 800,
      quality: 80

    };

    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => { });
  }

  showText(){
    let alert = this.alertCtrl.create({
      title:'提示',
      buttons:[
        {
          text:'现在显示',
          role:'现在显示',
          handler: ()=>{
          }
        },
        {
          text:'稍后查看',
          role:'稍后查看',
          handler: ()=>{


          }
        }
      ]
    });

    alert.present();
  }

}
