import {Loading , LoadingController} from "ionic-angular";
import {Toast, ToastController} from "ionic-angular";

export abstract class BaseUI{
  constructor(){}

  protected showLoading(loadingCtrl: LoadingController,
                        message: string): Loading {
    let loader = loadingCtrl.create({
      content: message,
      dismissOnPageChange: true //页面变化的时候自动关闭 loading
    });
    loader.present();
    return loader;
  }

  protected showToast(toastCtrl: ToastController, message: string): Toast {
    let toast = toastCtrl.create({
      message: message,
      duration: 2000, //默认展示的时长
      position: 'top'
    });
    toast.present();
    return toast;
  }
}
