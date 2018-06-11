import { Component } from '@angular/core';

/**
 * Generated class for the OrgianComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'orgian',
  templateUrl: 'orgian.html'
})
export class OrgianComponent {

  text: string;

  constructor() {
    console.log('Hello OrgianComponent Component');
    this.text = 'Hello World';
  }

}
