import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocalStorageProvider } from "../../providers/local-storage/local-storage";

/**
 * Generated class for the CustomPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-custom',
  templateUrl: 'custom.html',
})
export class CustomPage {


  public custom=[
    {
      "img":"assets/imgs/公告icon.png",
      "checked":true,
      "text":"公告信息",
      "info":"展示最新的公告告示",
    },
    {
      "img":"assets/imgs/警报icon.png",
      "checked":true,
      "text":"紧急事件报警",
      "info":"最紧急的待办事项",
    },{
      "img":"assets/imgs/待办事项icon.png",
      "checked":true,
      "text":"待办事项",
      "info":"事件、巡检、变更都在这",
    },{
      "img":"assets/imgs/事项查询icon.png",
      "checked":true,
      "text":"事项查询",
      "info":"事件、巡检、变更都在这",
    },{
      "img":"assets/imgs/排班信息icon.png",
      "checked":true,
      "text":"当前排班信息",
      "info":"今日　值班人：高翔　审核人：张怡",
    },{
      "img":"assets/imgs/巡检icon.png",
      "checked":true,
      "text":"当前巡检任务",
      "info":"展示当前最新的巡检任务",
    },{
      "img":"assets/imgs/报表icon.png",
      "checked":true,
      "text":"报表查询",
      "info":"最新报表展示",
    }
  ];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public localStorage: LocalStorageProvider) {
    if(this.localStorage.get('custom')){
      this.custom = this.localStorage.get('custom');
      console.log(this.custom);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomPage');
  }
  ionViewWillLeave(){
    this.localStorage.set('custom',this.custom);
  }

  changeChecked(index){
    this.custom[index]['checked']=!this.custom[index]['checked'];
    console.log(this.custom);
  }

}
