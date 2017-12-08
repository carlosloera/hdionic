import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AlertController, NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';
/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

  constructor(public http: Http,
              public alert:AlertController) {
    console.log('Hello AuthProvider Provider');
  }
  
  sigIn(item):any{
    
   let headers=new Headers();
     
       headers.append('Content-Type','application/json');
   
       let option=new RequestOptions({headers:headers});
       //console.log("nombre "+item.name);loginlfdfdsdfd
      let promesa= new Promise((resolve,reject)=>{ 
       this.http.post('http://localhost:8000/api/users/login',item,option)
       .subscribe(data=>{
          let res=data.json();
          if(res==true){
            resolve(true);
          }
          else{
            resolve(false);
          }
       }); 
       
      })
      return promesa;
  }

  create(item):any {
    
    let headers=new Headers();

    
    
    headers.append('Content-Type','application/json');

    let option=new RequestOptions({headers:headers});
    
    let promesa= new Promise((resolve,reject)=>{

      //http://localhost:8000/users/registrar
      this.http.post('http://localhost:8000/api/users/registrar',item,option)
      .subscribe(data=>{
        let res=data.json();
        if (res!=true && res!=false){
          this.alert.create({
            title: " Error ",
            subTitle: res,
            buttons: ["OK"]
          }).present();
          resolve(false);
        }
        else if ( res==true){
          resolve(true);
        }
        else{
          resolve(false);
        }
        resolve();
      })
    })
    return promesa;
  }

  getDestino()
  {
    let headers=new Headers();
        headers.append('Content-Type','application/json');
        let option=new RequestOptions({headers:headers});
        
        return this.http.post('http://localhost:8000/users/destino',option)
                   .map(res=>{
                      return res.json();
                   });
        /*
        let promesa= new Promise((resolve,reject)=>{
                this.http.post('http://localhost:8000/users/destino',option)
                .subscribe(data=>{
                  let res=data.json();
                  if(res===null){
                    this.alert.create({
                      title: " Error ",
                      subTitle: res,
                      buttons: ["OK"]
                    }).present();
                    resolve(false);
                  }
                  else {
                    resolve(true)
                  }
                })
              });
              return promesa;
              */
  }
  

}
