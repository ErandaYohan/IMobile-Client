import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserDto } from '../DTO/userDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList: any = []

  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { }
  readonly BaseURI = 'http://localhost:37968/api';


  getProducts() {
    return this.productList.asObservable();
  }
  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  addtoCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    })
    return grandTotal;
  }
  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart() {
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  passApi(user:UserDto){
    // alert("I(N");
    console.log("IN "+user)
    return this.http.post<any>(this.BaseURI + '/orders', user);
  }
}
