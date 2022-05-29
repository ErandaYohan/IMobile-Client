import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, observable, throwError } from 'rxjs';
import { UserDto } from '../DTO/userDTO';

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

  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:37968/api';
  readonly PhotoUrl = "http://localhost:53535/Photos/";

  formModel = this.fb.group({
    UserName: [''],
    Email: [''],
    Passwords: this.fb.group({
      Password: [''],
      ConfirmPassword: ['']
    })

  });

  register() {
    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      Password: this.formModel.value.Passwords.Password
    };
    return this.http.post(this.BaseURI + '/Authenticate/register', body);
  }

  login(formData: any) {
    return this.http.post(this.BaseURI + '/Authenticate/login', formData);
  }
  getUserProfile() {
    return this.http.get<UserDto>(this.BaseURI + '/UserProfile');
  }

  HaveAccess() {
    var loggintoken = localStorage.getItem('token') || '';
    var _extractedtoken = loggintoken.split('.')[1];
    var _atobdata = atob(_extractedtoken);
    var _finaldata = JSON.parse(_atobdata);
    if (_finaldata.role == 'Admin') {
      return true
    } else {
      alert('you not having access');
      return false
    }
  }

  // getCateList():Observable<any[]>{
  //   return this.http.get<any>(this.BaseURI+'/categories');
  // }


  //Categories CRUD Operations
  getCateList() {
    return this.http.get<any>(this.BaseURI + '/categories');
  }

  addCateList(val: any) {
    return this.http.post<any>(this.BaseURI + '/categories', val);
  }

  updateCateList(val: any) {
    return this.http.put<any>(this.BaseURI + '/categories', val);
  }

  deleteCateList(catId: string): Observable<number> {
    return this.http.delete<number>(this.BaseURI + '/categories/' + catId);
  }

  //Product CRUD Operations

  getProductList(): Observable<any[]> {
    return this.http.get<any>(this.BaseURI + '/Items');
  }

  addProductList(val: any) {
    return this.http.post<any>(this.BaseURI + '/Items', val);
  }

  updateProductList(val: any) {
    return this.http.put<any>(this.BaseURI + '/Items', val);
  }

  deleteProductList(pId: string): Observable<number> {
    return this.http.delete<number>(this.BaseURI + '/Items/' + pId);
  }
  //Get All Categories
  getAllCategoriesNames(): Observable<any[]> {
    return this.http.get<any[]>(this.BaseURI + '/Items/GetAllCategoriesNames');
  }
  //Upload Image
  UploadPhoto(val: any) {
    return this.http.post(this.BaseURI + '/Items/SaveFile', val);
  }


  handleError(err: HttpErrorResponse) {
    // console.log("Begin", err);
    if (err.error instanceof ProgressEvent) {
      // Network Error
      // console.log('An error occurred: ' + err.error.message)
      // alert('Please check your network connection or make sure server is alive');
      // this.logOut("Please check your network connection or make sure server is alive");
    } else if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // alert('An error occurred: ' + err.error.message);
      console.log('An error occurred: ' + err.error.message)
      // this.logOut('An error occurred: ' + err.error.message);
    } else {
      if (err.status === 400) {
        // alert(err.error.message+"code :"+err.status);
        console.log('An error occurred: ' + err.error.message)
        // this.logOut('An error occurred: ' + err.error.message);
      } else if (err.status === 301) {
        console.log('You will be logged out.');
        // alert(err.error.message+"code :"+err.status);
        console.log('An error occurred: ' + err.error.message)
        // this.logOut('An error occurred: ' + err.error.message);

      } else if (err.status === 401) {
        console.log('You will be logged out.');
        // alert(err.error.message+"code :"+err.status);
        // this.logOut('An error occurred: ' + err.error.message);

      } else if (err.status === 403) {
        // alert(err.error.message+"code :"+err.status);
        console.log('An error occurred: ' + err.error.message)
        // this.logOut('An error occurred: ' + err.error.message);

      }else if (err.status === 404) {
        // alert(err.error.message+"code :"+err.status);
        console.log('An error occurred: ' + err.error.message)
        // this.logOut('An error occurred: ' + err.error.message);

      } else if (err.status === 500) {
        // alert(err.error.message+"code :"+err.status);
        console.log('An error occurred: ' + err.error.message)
        // this.logOut('An error occurred: ' + err.error.message);
      }else  {
        // alert(err.error.message+"code :"+err.status);
        console.log('An error occurred: ' + err.error.message)
        // this.logOut('An error occurred: ' + err.error.message);
      }
    }
    // this.auth.logout();
    return throwError(err);
  }
}
