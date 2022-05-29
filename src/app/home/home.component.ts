import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductList } from '../DTO/ProductDTO';
import { CartService } from '../shared/cart.service';
import { __asyncDelegator } from 'tslib';
import { elementAt } from 'rxjs';
import { UserDto } from '../DTO/userDTO';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails!: UserDto;
  total: any;
  constructor(private router: Router, private service: UserService, private cartService: CartService) { }

  ProductList: Array<ProductList> = [];
  addTocart: Array<ProductList> = [];
  ModalTitle!: string;
  ActivateAddEditProductComp: boolean = false;
  ActivateAddEditCartComp: boolean = false;
  Product: any;
  cart: any;

  ngOnInit() {
    this.userDetails=new UserDto();

    // if( sessionStorage.getItem("addtocart") != undefined){
    //     // this.gTotal=0;
    // let data =sessionStorage.getItem("addtocart");
    // if(data != undefined || data != null)
    // {
    //   this.ProductList=JSON.parse(data);
    //   // this.addTocart=
    // }
    // }

    this.service.getUserProfile().subscribe(
      res => {
        this.userDetails =res;
        console.log(JSON.stringify(res));
        sessionStorage.setItem("userId", this.userDetails.id)
      },
      err => {
        console.log(err);
      },
    );

    this.ShowProductList();
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }


  ShowProductList() {
    this.service.getProductList().subscribe(data => {

      if (data != null) {
        this.ProductList = data;
        console.log("Res " + JSON.stringify(this.ProductList[0].pId))
        // console.log("Array "+JSON.stringify(this.CategoriesList[0]))
      }

    })

  }
  addtocart(dataItem: ProductList) {
    // alert(dataItem.productName)
    // alert(JSON.stringify(this.ProductList))
    let ProductList: Array<ProductList> = [];
    let data = sessionStorage.getItem("addtocart");


   

    if (data != undefined || data != null) {
      ProductList = JSON.parse(data);
      const found = ProductList.find(e => e.pId == dataItem.pId);
     
      if(found){

        let arraytot= (found.qty+dataItem.qty);
        // console.log("found" + (found.qty+dataItem.qty));
        found.qty=arraytot;
        // ProductList.push(found);
        let total = (dataItem.pPrice *arraytot);
        dataItem.total = total;
        // ProductList.push(dataItem);
        sessionStorage.setItem('addtocart', JSON.stringify(ProductList));
        console.log("sssssss "+JSON.stringify(ProductList));
        // const index: number = ProductList.indexOf(found);
        // if (index !== -1) {
        //   ProductList.splice(index, 1);
        // }

        
        // let total = (dataItem.pPrice * dataItem.qty);
        // dataItem.total = total;
        

      }else{
        let total = (dataItem.pPrice * dataItem.qty);
      dataItem.total = total;
      ProductList.push(dataItem);
      sessionStorage.setItem('addtocart', JSON.stringify(ProductList));
      console.log("!!!!!" + JSON.stringify(JSON.stringify(ProductList)));
      }

      
      // if (ProductList.includes(dataItem)) {
      //   alert("includes");
      //   const index: number = ProductList.indexOf(dataItem);
      //   if (index !== -1) {
      //     ProductList.splice(index, 1);
      //   }
      // }else{
      //   alert("not include")
      // }
    
    }else{
      let total = (dataItem.pPrice * dataItem.qty);
      dataItem.total = total;
      ProductList.push(dataItem);
      sessionStorage.setItem('addtocart', JSON.stringify(ProductList));
      console.log("!!!!!" + JSON.stringify(JSON.stringify(ProductList)));
      // alert(JSON.stringify(JSON.stringify(this.ProductList)))
    }
    
   




  }
}
