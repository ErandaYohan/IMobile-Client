import { Injectable } from '@angular/core';
import {  FormBuilder, Validators, FormGroup } from '@angular/forms';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  updateCategories(val: { catId: string; categoryName: string; }) {
    throw new Error('Method not implemented.');
  }
  addCategories(val: { catId: string; categoryName: string; }) {
    throw new Error('Method not implemented.');
  }

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

  // getCateList():Observable<any[]>{
  //   return this.http.get<any>(this.BaseURI+'/categories');
  // }

  getCateList(){
    return this.http.get<any>(this.BaseURI+'/categories');
  }

 

  addCateList(val:any){
    return this.http.post<any>(this.BaseURI+'/categories',val);
  }

  updateCateList(val:any){
    return this.http.put<any>(this.BaseURI+'/categories',val);
  }

  deleteCateList(catId:string):Observable<number>{
    return this.http.delete<number>(this.BaseURI+'/categories/'+catId);
  }

  getProductList():Observable<any[]>{
    return this.http.get<any>(this.BaseURI+'/Items');
  }

  addProductList(val:any){
    return this.http.get<any>(this.BaseURI+'/Items',val);
  }

  updateProductList(val:any){
    return this.http.get<any>(this.BaseURI+'/Items',val);
  }

  deleteProductList(val:any){
    return this.http.get<any>(this.BaseURI+'/Items/',val);
  }
}
