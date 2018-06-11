import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonsearchPage } from './personsearch';

@NgModule({
  declarations: [
    PersonsearchPage,
  ],
  imports: [
    IonicPageModule.forChild(PersonsearchPage),
  ],
})
export class PersonsearchPageModule {}
