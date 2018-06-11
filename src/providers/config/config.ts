import {HttpClient, HttpHeaders,HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageProvider } from "../local-storage/local-storage";
//import { Observable } from "rxjs/Observable";
import { Observable } from "rxjs";
import {catchError} from "rxjs/operators";
import { JsonpClientBackend} from "@angular/common/http";

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigProvider {


  public  url='';

  public token:any;

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message

  };

  constructor(public http: HttpClient,
              public localStorage:LocalStorageProvider,
              ) {
    //console.log('Hello ConfigProvider Provider');

    this.url=this.localStorage.get('url');

  }

  getUrl(url){

    let apiUrl = "http://"+url+"/"

    return apiUrl;
  }



  //configUrl = 'assets/config.json';

  // getConfig(apiUrl,httpParams) {
  //
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //     })
  //   };
  //
  //   console.log(apiUrl);
  //   console.log(httpParams);
  //
  //   return this.http.post(apiUrl,httpParams, httpOptions);
  // }

  getToken(){

    let token = this.localStorage.get('token');

    //let token='eyJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjgzMDIzNzcsImFwcF9rZXkiOjEwMDAwMDA3ODIwMDY2fQ.V8BBEQN5svRwiHMCnlym5Jx4lis__DaJYVU6L-nM8L8';

    const httpOptions = {
      headers: new HttpHeaders({
        'Authoriztion': token
      })
    };

    return httpOptions;
  }

  getHeader(){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type":"application/x-www-form-urlencoded"
      })
    };

    return httpOptions;
  }


  login(account,password,url){
    let api='api/v1/user/login';

    let apiURl="http://"+url+"/"+api;

    //let httpOptions = this.getHeader();

    //return this.getLogin(apiURl,httpParams,httpOptions)

    let path=apiURl+"?account="+account+"&password="+password;

    return this.http.post(path,{});

  }

  getApiGetLogin(account,password){

    let api='api/v1/user/login';

    let apiURl="http://"+this.url+"/"+api;



    //let httpOptions = this.getHeader();

    //account=登录帐户&password=用户密码

    return this.http.get(apiURl+'?account='+account+'&password='+password);
  }

  getApiTodoList(httpParams){
    let api='api/v1/task/pending/incident';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiEventList(httpParams){
    let api='api/v1/task/toStart';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }


  getLogin(apiUrl,httpParams,httpOptions):Observable<{}>{
    return this.http.post(apiUrl,httpParams,httpOptions);
  }


  getPostReturn(apiUrl,httpParams,httpOptions){


      return this.http.post(apiUrl,httpParams,httpOptions);


  }

  getApiPersonSearch(httpParams){
    let api='api/v1/common/searchUser';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiPushTask(httpParams){


    let api='api/v1/task/complete';//http://47.100.242.167/api/v1/task/ complete

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiHistory(httpParams){

    let api='api/v1/case/opinion';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiTaskDeliver(httpParams){

    let api='api/v1/task/assign';//http://47.100.242.167/api/v1/task/ assign

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiTaskReject(httpParams){

    let api='api/v1/task/reject';//http://47.100.242.167/api/v1/task/rejectToStart

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  //http://47.100.242.167/api/v1/task/ rejectToStart

  getApiTaskrejectToStart(httpParams){

    let api='api/v1/task/rejectToStart';//http://47.100.242.167/api/v1/task/rejectToStart

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiBatch(httpParams){


    let api='api/v1/task/batchComplete';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiFile(id){

    let token = this.localStorage.get('token');

    let api='api/v1/common/attachment';//http://47.100.242.167/api/v1/common/attachment

    let apiURl="http://"+this.url+"/"+api;

    let url=apiURl+'?fileId='+id+'&Authoriztion='+token

    return url;

    //return this.http.get(apiURl+'?fielId='+id+'&Authoriztion='+token);
  }

  getApiRoute(httpParams){
    //	http://47.100.242.167/api/v1/task/pending/ins

    //api/v1/task/pending/ins

    let api='api/v1/task/pending/ins';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)

  }

  getApiRouteList(httpParams){

    //http://47.100.242.167/ api/v1/task/toStart

    let api='api/v1/task/toStart';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }



  getApiRouteRegion(httpParams){

    //http://47.100.242.167/api/v1/common/dic

    let api='api/v1/common/dic';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  getApiPushTop(httpParams){
    //http://47.100.242.167/api/v1/task/top

    let api='api/v1/task/top';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }

  //http://47.100.242.167/api/v1/task/cancelTop

  getApiCancelTop(httpParams){
    //http://47.100.242.167/api/v1/task/top

    let api='api/v1/task/cancelTop';

    let apiURl="http://"+this.url+"/"+api;

    let httpOptions = this.getToken();

    return this.getPostReturn(apiURl,httpParams,httpOptions)
  }
}


