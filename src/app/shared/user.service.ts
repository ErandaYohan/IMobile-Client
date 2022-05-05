import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
    var tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})
    return this.http.get(this.BaseURI + '/UserProfile', {headers: tokenHeader});
  }
}
