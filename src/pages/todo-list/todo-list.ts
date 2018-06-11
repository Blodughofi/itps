import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import { HttpClient } from "@angular/common/http";
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";
import { EventPage } from "../event/event";
import { ConfigProvider } from "../../providers/config/config";
import { RoutePage } from "../route/route";
import { BaseUI } from "../../common/baseUI";
import { LoginPage } from "../login/login";

/**
 * Generated class for the TodoListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html',
})
export class TodoListPage extends BaseUI{

  public todoList=[];
  public closeList=[];
  public isHandList=true;
  public todoListHad=true;
  public isrefresh=false;
  public coust=0;
  public iscoust=false;

  public placeholder='标题、工单号';//

  public keyword='';

  public page=1;
  public pageSize=5;

  public data:any;

  public keywords='';
  public search='';

  public event=true;

  public route=false;

  public isActive1=true;

  public checkbox=false;
  public close=false;
  public edit=false;

  public statusCheck='编辑';

  public status=1;

  public checked=false;
  public batch=false;
  public bool=false;

  public list=[];
  public listId=[];

  public upData=true;

  public listString='';

  public view='';

  public eventStatus='待关闭';



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http:HttpClient,
              public localStorage: LocalStorageProvider,
              public config: ConfigProvider,
              public loadingCtrl: LoadingController,
              public alertCtrl:AlertController,
              public toastCtrl: ToastController) {
    super();


    this.status=1;

  }

  ionViewDidEnter() {

    this.todoList=[];
    this.page=1;

    this.getTodoList('');

  }



  getTodoList(infiniteScroll){

    let loading:any;

    if(!infiniteScroll){
      loading = this.showLoading(this.loadingCtrl,'加载中');
    }

    let httpParams = {
        "page":this.page,
        "pageSize":this.pageSize,
        "data":{
          "keyword":this.search,
          "status":this.status
        }
    };

    console.log(httpParams);

      if(this.todoListHad){
        this.config.getApiTodoList(httpParams)
          .subscribe(req => {

            console.log(req);

            this.todoList=this.todoList.concat(req['data']['taskList']);

            if(this.todoList.length>0){
              this.isHandList = false;
            }else{
              this.isHandList = true;
            }


            for(let i=0; i<this.todoList.length; i++){
              this.list=[];
              this.listId=[];
              this.list.push(false);
              this.listId.push(null);
            }

            this.iscoust=false;
            this.coust=null;



            if(!infiniteScroll){
              loading.dismissAll();
            }else{
              infiniteScroll.complete();
              if(req['data']['taskList'].length<this.pageSize){  /*没有数据停止上拉更新*/
                infiniteScroll.enable(false);
              }
            }



          },error=>{
            console.log(error);
          })

      }else if(this.route){

        this.config.getApiRoute(httpParams)
          .subscribe( req=>{

            console.log(httpParams);

            this.todoList=this.todoList.concat(req['data']['taskList']);

            console.log(req);
            console.log(this.todoList);

            if(this.todoList.length>0){
              this.isHandList = false;
            }else{
              this.isHandList = true;
            }

            this.iscoust=false;
            this.coust=null;



            for(let i=0; i<this.todoList.length; i++){
              this.list=[];
              this.listId=[];
              this.list.push(false);
              this.listId.push(null);
            }

            if(!infiniteScroll){
              loading.dismissAll();
            }else{
              infiniteScroll.complete();
              if(req['data']['taskList'].length<this.pageSize){  /*没有数据停止上拉更新*/
                infiniteScroll.enable(false);
              }
            }


          },error=>{

            //loading.dismissAll();

          })

      }



  }


  gotoEvent(id,name){


    this.navCtrl.push(EventPage,{
      'id':id,
      'status':name,
      callback:this.getTodoList
    });

  }


  doInfinite(infiniteScroll){

    this.page++;
    this.getTodoList(infiniteScroll);
  }

  showRoute(){

    this.page=1;

    console.log(this.status);

    if(this.status===2){
      this.statusCheck='编辑';
      this.checkbox=false;
      for(let i=0; i<this.todoList.length; i++){
        this.list.push(false);
        this.listId.push(null);
      }
    }
    this.route=true;
    this.page=1;
    this.todoList=[];
    this.todoListHad=false;
    this.eventStatus='待审批';
    this.placeholder='标题、区域';
    this.getTodoList('');

  }

  showEvent(){
    this.route=false;
    this.page=1;

    console.log(this.status);

    if(this.status===2){
      this.statusCheck='编辑';
      this.checkbox=false;
      for(let i=0; i<this.todoList.length; i++){
        this.list.push(false);
        this.listId.push(null);
      }
    }

    this.iscoust=false;
    this.coust=null;

    this.checkbox=false;
    this.todoListHad=true;
    this.page=1;
    this.todoList=[];
    this.eventStatus='待关闭';
    this.placeholder='标题、工单号';
    this.getTodoList('');

  }


  gotoRoute(taskId){
    this.navCtrl.push(RoutePage,{
      "id":taskId,
      "status":this.status
    });
  }

  // doRefresh(refresher) {
  //
  //   setTimeout(() => {
  //     refresher.complete();
  //   }, 2000);
  // }

  getUpData(){

    this.status=0;
    this.todoList=[];
    this.getTodoList('');

  }


  onSearchKeyUp(event){

    console.log(event);

    if("Enter"==event.key){
      this.getUpData();
    }
    if(event.keywords===13){
      this.getUpData();
    }
  }

  statusHandle(){
    this.page=1;
    this.status=1;
    if(!this.isActive1){
      this.isActive1=!this.isActive1;
      this.checkbox=false;
      this.statusCheck='编辑';
      this.status=1;
      this.edit=false;

    }

    this.todoList=[];
    this.getTodoList('');


  }

  statusClosed(){
    this.page=1;
    this.status=2;
    if(this.isActive1){
      this.isActive1=!this.isActive1;
      this.status=2;

    }
    this.edit=true;
    this.todoList=[];
    this.getTodoList('');

  }

  doedit(){



    if(this.statusCheck === '编辑'){
      this.checkbox=true;
      this.statusCheck='取消';
    }else if(this.statusCheck==='取消'){
      this.checkbox=false;
      this.statusCheck='编辑';
      //this.getTodoList('');
      this.upData=false;
    }else if(this.statusCheck==='关闭'){
      if(this.todoListHad){
        this.batch=true;
        this.upData=false;
      }else{

        let alert = this.alertCtrl.create({
          title:'提示',
          message:'确定要关闭吗？',
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

                let arr=[];

                for(var i=0;i<this.listId.length;i++){
                  if(this.listId[i]){
                    arr.push(this.listId[i]);
                  }
                }

                this.listString=arr.join(',');

                let httpParams={ "data":{ "taskIds":this.listString, "opinion":'OK' } };

                this.config.getApiBatch(httpParams)
                  .subscribe(req=>{
                    console.log(httpParams);
                    if(req['code']==200){
                      for(let i=0; i<this.todoList.length; i++){
                        this.list.push(false);
                        this.listId.push(null);
                      }

                      this.coust=null;
                      this.iscoust=false;

                      this.todoList=[];
                      this.checkbox=false;
                      this.statusCheck='编辑';
                      this.upData=false;
                      this.batch=false;


                      this.getTodoList('');
                    }
                  },error=>{
                    let message=error['data']['message'];
                    let toast=this.showToast(this.toastCtrl,message);
                    toast.dismissAll();
                  });

              }
            }
          ]
        });
        alert.present();

      }
      //this.todoList=[];
      //this.getTodoList('');
    }
  }

  unique(arr){

    var res = [arr[0]];

    for(var i=1;i<arr.length;i++){

      var repeat = false;

      for(var j=0;j<res.length;j++){

        if(arr[i] == res[j]){

          repeat = true;

          break;

        }

      }

      if(!repeat){

        res.push(arr[i]);

      }

    }

    return res;

  }

  editNull(arr){

    for(var i=0;i<arr.length;i++)
    {
      if(!arr[i]){
        arr.splice(i,1)
      }
    }

    return arr;

  }

  getStatus(index,id){
   this.list[index]=!this.list[index];
   console.log(this.list);
   if(this.list[index]){
     this.listId[index]=id;
     this.statusCheck='关闭';
     this.iscoust=true;

   }else{
     this.listId[index]=null;

   }
   // for(var i=0;i<this.listId.length;i++){
   //   if(this.listId[i]){
   //     this.closeList.push(this.listId[i]);
   //   }
   //

    let num=0;

    for(var i=0;i<this.listId.length;i++){
     if(this.listId[i]){
       num++;
     }
     else{
       num--;
     }
    }



    this.coust=(num+this.listId.length)/2

    console.log(this.listId);
    console.log(this.coust);


    if(this.coust==0){
      this.statusCheck='取消';
      this.iscoust=false;
    }
  }

  closeBtn(){
    this.batch=false;
    this.statusCheck='关闭';
    this.checkbox=true;
  }

  push(){

    let arr=[];

    for(var i=0;i<this.listId.length;i++){
      if(this.listId[i]){
        arr.push(this.listId[i]);
      }
    }

    this.listString=arr.join(',');

    console.log(this.listString);

     let httpParams:any;
    if(this.view){
      httpParams={ "data":{ "taskIds":this.listString, "opinion":this.view } };
    }else if(this.route){
      httpParams={ "data":{ "taskIds":this.listString, "opinion":'OK' } };
    }else if(this.todoListHad){
      let toast=this.showToast(this.toastCtrl,'没有填写提交原因');
      toast.dismissAll();
      return false;
    }

    console.log(httpParams);

    this.config.getApiBatch(httpParams)
      .subscribe(req=>{
        console.log(req);
        if(req['code']==200){

          for(let i=0; i<this.todoList.length; i++){
            this.list.push(false);
            this.listId.push(null);
          }

          this.coust=null;
          this.iscoust=false;

          this.todoList=[];
          this.checkbox=false;
          this.statusCheck='编辑';
          this.upData=false;
          this.batch=false;

          this.view='';


          this.getTodoList('');
        }
      },error=>{
        console.log(error);
      })
  }

  inputChange(event){
    this.search=event;
    if(!event){
      this.getUpData();
    }
  }

  gotoTop(event,topid,id){

    event.stopPropagation();
    let httpParams={
      "data":{
        "taskId":id
      }
    };

    if(topid){


      let alert = this.alertCtrl.create({
        title:'提示',
        message:'确定要取消置顶吗？',
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

              this.config.getApiCancelTop(httpParams)
                .subscribe(req=>{
                  console.log(httpParams);
                  if(req['code']==200){
                    this.page=1;
                    this.todoList=[];
                    this.getTodoList('');
                  }
                },error=>{
                  console.log(error);
                });

            }
          }
        ]
      });
      alert.present();



    }else{
      let alert = this.alertCtrl.create({
        title:'提示',
        message:'确定要置顶吗？',
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

              this.config.getApiPushTop(httpParams)
                .subscribe(req=>{
                  console.log(req);
                  if(req['code']==200){
                    this.page=1;
                    this.todoList=[];
                    this.getTodoList('');
                  }
                },error=>{
                  console.log(error);
                });

            }
          }
        ]
      });
      alert.present();
    }

    console.log(id);
  }

  doRefresh(refresher){
    setTimeout(() => {
          refresher.complete();
        }, 1000);
  }

  showRefresh(refresh){
    console.log('refresh');
    this.isrefresh=true;
    setTimeout(function(){
      refresh.complete();
      refresh.enable(false);
      setTimeout(function(){
        this.isrefresh=false;
      },2000);
      //this.isrefresh=true;
    },1);

    //this.getTodoList('');


  }


}
