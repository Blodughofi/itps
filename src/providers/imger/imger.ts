import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImagePicker, ImagePickerOptions } from "@ionic-native/image-picker";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";

/*
  Generated class for the ImgerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImgerProvider {

   imagePickerOpt={
    maximumImagesCount: 5,//选择一张图片
    width: 800,
    height: 800,
    quality: 80
  };

  // const options: ImagePickerOptions = {
  //   maximumImagesCount: 6,
  //   width: 800,
  //   height: 800,
  //   quality: 80
  // };

  upload: any = {
    url: 'http://xxx/',           //接收图片的url
    fileKey: 'image',  //接收图片时的key
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8' //不加入 发生错误！！
    },
    params: {},        //需要额外上传的参数
    success: (data) => {}, //图片上传成功后的回调
    error: (err) => {},   //图片上传失败后的回调
    listen: () => {}   //监听上传过程
  };

  constructor(public http: HttpClient,
              public imagePicker: ImagePicker,
              public transfer: FileTransfer,
              public fileTransfer:FileTransferObject,) {
    console.log('Hello ImgerProvider Provider');
    this.fileTransfer=this.transfer.create();
  }

  openImagePicker(){
    console.log(1);

    const imagePickerOpt={
      maximumImagesCount: 5,//选择一张图片
      width: 800,
      height: 800,
      quality: 80
    };


    let temp=[];
    this.imagePicker.getPictures(imagePickerOpt).then((results) => {
      console.log(3);
      for (var i = 0; i < results.length; i++) {
        console.log(2)
        console.log('Image URI: ' + results[i]);
        temp.push(results[i]);
        console.log(temp);
        //this.uploadImg(results[i]);
      }
    }, (err) => {
      console.log(err);
    })
  }

  uploadImg(path) {
    if(!path) {
      return;
    }

    let options: any;
    options = {
      fileKey: this.upload.fileKey,
      headers: this.upload.headers,
      params: this.upload.params
    };
    this.fileTransfer.upload(path, this.upload.url, options)
      .then((data) => {

        if(this.upload.success) {
          this.upload.success(JSON.parse(data.response));
        }

      }, (err) => {
        if(this.upload.error) {
          this.upload.error(err);
        } else {
          //this.noticeSer.showToast('错误：上传失败！');
        }
      });
  }

}
