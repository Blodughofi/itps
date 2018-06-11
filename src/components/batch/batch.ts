import { Component } from '@angular/core';
import {NavController} from "ionic-angular";
import { TodoListPage } from "../../pages/todo-list/todo-list";

/**
 * Generated class for the BatchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'batch',
  templateUrl: 'batch.html'
})
export class BatchComponent {

  text: string;

  constructor(public navCtrl:NavController) {
    console.log('Hello BatchComponent Component');
    this.text = 'Hello World';
  }

  close(){
    this.navCtrl.push(TodoListPage,{'status':2})
  }

}
