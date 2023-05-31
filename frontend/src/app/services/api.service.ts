import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  serverUrl='https://apis.ruang-ekspresi.id/fipex/index.php/';
  public photoBaseUrl='https://apis.ruang-ekspresi.id/fipex/photos/';
  public fileBaseUrl='https://apis.ruang-ekspresi.id/fipex/files/';
  httpOption:any;
  constructor(
    public http:HttpClient
  ) 
  {
    
  }
  token:any;
  getToken()
  {
    var tokens=localStorage.getItem('fipexToken');
    this.token={email:'',jwt:''};
    if(tokens!=null)
    {
      this.token=JSON.parse(tokens);      
    }
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+this.token
      })
    };
  }
  generateOption(bearer:any)
  {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+bearer
      })
    };
  }
  me()
  {
    this.getToken();
    return this.http.get(this.serverUrl+'auth/me', this.httpOption);
  }  
  get(url:any)
  {
    this.getToken();
    return this.http.get(this.serverUrl+url, this.httpOption);
  }
  getWithBearer(url:any,bearer:any)
  {
    this.generateOption(bearer);
    return this.http.get(this.serverUrl+url, this.httpOption);
  }
  post(url:any,data:any)
  {
    this.getToken();
    return this.http.post(this.serverUrl+url,data,  this.httpOption);
  }
  postWithBearer(url:any,data:any,bearer:any)
  {
    this.generateOption(bearer);
    return this.http.post(this.serverUrl+url,data, this.httpOption);
  }
  put(url:any,data:any)
  {
    this.getToken();
    return this.http.put(this.serverUrl+url,data,  this.httpOption);
  }
  putWithBearer(url:any,data:any,bearer:any)
  {
    this.generateOption(bearer);
    return this.http.put(this.serverUrl+url,data, this.httpOption);
  }
  delete(url:any)
  {
    this.getToken();
    return this.http.delete(this.serverUrl+url,  this.httpOption);
  }
  import(file:any)
  {
    //this.getToken();
    return this.http.post(this.serverUrl+'import',file);
  }

  upload(url:any,data:any)
  {
    this.getToken();
    this.httpOption = {
      headers: new HttpHeaders({       
        'Authorization': 'Bearer '+this.token.jwt
      })
    };
    return this.http.post(this.serverUrl+url,data,  this.httpOption);
  }

  uploadImage(url:any,data:any) {
    this.getToken();
    this.httpOption = {
      headers: new HttpHeaders({       
        'Authorization': 'Bearer '+this.token.jwt
      })
    };

    return this.http.post(this.serverUrl+url,data,  this.httpOption);
  }

  uploadDoc(url:any,data:any) {
    this.getToken();
    this.httpOption = {
      headers: new HttpHeaders({       
        'Authorization': 'Bearer '+this.token.jwt
      })
    };

    return this.http.post(this.serverUrl+url,data,  this.httpOption);
  }

  user()
  {
    var tokens=localStorage.getItem('fipexToken');
    this.token={email:'',jwt:'',username:'',tahunPelajaran:'',semester:''};
    if(tokens!=null)
    {
      this.token=JSON.parse(tokens);      
    }  
    return this.token; 
  }
}
