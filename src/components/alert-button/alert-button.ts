import { Component,Output, EventEmitter,Input } from '@angular/core';
import { PersonsearchPage } from "../../pages/personsearch/personsearch";
import {NavController, ToastController} from "ionic-angular";
import { ConfigProvider } from "../../providers/config/config";
import { TodoListPage } from "../../pages/todo-list/todo-list";
import { BaseUI } from "../../common/baseUI";

/**
 * Generated class for the AlertButtonComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'alert-button',
  templateUrl: 'alert-button.html'
})
export class AlertButtonComponent extends BaseUI{
  @Output() goto = new EventEmitter();
  @Input()  taskId:string;

  message='提示';

  anthorMessage='请选择转交人员';

  public user='';
  public assigneeId='';
  public assigneeName='';
  //public user='';
  //public close:any;

  constructor(public navCtrl:NavController,
              public config:ConfigProvider,
              public toastCtrl:ToastController) {
    super();
  }

  getData = (data) => {
    return new Promise((resolve,reject) => {


      console.log(data);
      let useInfo = data;
      this.user=useInfo.fullname;
      this.assigneeName=useInfo.fullname;
      this.assigneeId=useInfo.userId;
      resolve();
    })
  };

  pushSearch(){
    this.navCtrl.push(PersonsearchPage,{callback:this.getData});
  }
  changeClose(){
     this.goto.emit({close:false});
  }
  deliver(){
    let httpParams={
      "data":{
        "taskId":this.taskId,
        "assigneeId":this.assigneeId,
        "assigneeName":this.assigneeName,
        "opinion":"OK"
      }
    };
    this.config.getApiTaskDeliver(httpParams)
      .subscribe(req=>{
        if(req['code'] == 200){


          this.navCtrl.push(TodoListPage);

        }

      },error=>{
        console.log(error);
      })
  }

  pushAnthor(){
    if(!this.user){
      let toast=this.showToast(this.toastCtrl,'没有选择转交对象');
      toast.dismissAll();
    }
    //this.deliver();
    this.navCtrl.pop();
  }

}
