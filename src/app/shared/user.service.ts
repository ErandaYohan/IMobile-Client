import { Injectable } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private http:HttpClient) { }
  readonly BaseURI = 'http://localhost:37968/api';

  formModel = this.fb.group({
    UserName :[''],
    Email :[''],
    Passwords : this.fb.group({
      Password :[''],
      ConfirmPassword :['']
    })
    
  });

  register(){
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI+'/Authenticate/register',body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/Authenticate/login', formData);
  }
  getUserProfile() {
    return this.http.get(this.BaseURI + '/UserProfile');
  }

  HaveAccess(){
    var loggintoken=localStorage.getItem('token')||'';
    var _extractedtoken=loggintoken.split('.')[1];
    var _atobdata=atob(_extractedtoken);
    var _finaldata=JSON.parse(_atobdata);
    if(_finaldata.role=='Admin'){
      return true
    }else{
      alert('you not having access');
      return false
    }
  }
}
