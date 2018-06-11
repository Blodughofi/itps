import { Component } from '@angular/core';

import { OperatePage } from '../operate/operate';
import { MyPage } from '../my/my';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = OperatePage;
  tab3Root = MyPage;

  constructor() {

  }
}
