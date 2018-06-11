import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ComponentsModule } from "../components/components.module";

import { OperatePage } from '../pages/operate/operate';
import { MyPage } from '../pages/my/my';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UserInfoPage} from "../pages/user-info/user-info";
import { CustomPage } from "../pages/custom/custom";
import { TodoListPage } from "../pages/todo-list/todo-list";
import { NoticePage } from "../pages/notice/notice";
import { EmergencyPage } from "../pages/emergency/emergency";
import { SearchPage } from "../pages/search/search";
import { EventPage } from "../pages/event/event";
import { RoutePage } from "../pages/route/route";
import { HistoryPage } from "../pages/history/history";
import { PersonsearchPage } from "../pages/personsearch/personsearch";

import { LoginPage } from "../pages/login/login";

import{ HttpClientModule } from "@angular/common/http";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ConfigProvider } from '../providers/config/config';
import { HttpServicesProvider } from '../providers/http-services/http-services';
import { ScreenOrientation } from "@ionic-native/screen-orientation";

import { IonicStorageModule } from '@ionic/storage';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';

import { ImagePicker } from "@ionic-native/image-picker";
import { FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { Camera } from "@ionic-native/camera";
import { ImgServiceProvider } from '../providers/img-service/img-service';
//import { FileOpener } from '@ionic-native/file-opener';
import { FileChooser } from "@ionic-native/file-chooser";
import { IOSFilePicker } from "@ionic-native/file-picker";
import { DatePicker } from "@ionic-native/date-picker";
import { ImgerProvider } from '../providers/imger/imger';
import { BackButtonProvider } from '../providers/back-button/back-button';
import { PhotoLibrary } from "@ionic-native/photo-library";
import { PhotoViewer } from "@ionic-native/photo-viewer";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery";

@NgModule({
  declarations: [
    MyApp,
    OperatePage,
    MyPage,
    HomePage,
    UserInfoPage,
    CustomPage,
    TodoListPage,
    NoticePage,
    EmergencyPage,
    SearchPage,
    PersonsearchPage,
    EventPage,
    HistoryPage,
    LoginPage,
    RoutePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ComponentsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true',
      backButtonText: '',
      backButtonIcon:'ios-arrow-back'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OperatePage,
    MyPage,
    HomePage,
    UserInfoPage,
    CustomPage,
    TodoListPage,
    NoticePage,
    EmergencyPage,
    SearchPage,
    PersonsearchPage,
    EventPage,
    HistoryPage,
    LoginPage,
    RoutePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    Camera,
    File,
    ImagePicker,
    Base64ToGallery,
    FileTransferObject,
    FileTransfer,
    //FileOpener,
    FileChooser,
    PhotoLibrary,
    PhotoViewer,
    IOSFilePicker,
    DatePicker,
   //FileOpener,
    SplashScreen,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServicesProvider,
    LocalStorageProvider,
    ImgServiceProvider,
    ImgerProvider,
    BackButtonProvider
  ]
})
export class AppModule {}
