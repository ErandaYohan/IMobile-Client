import { UserService } from './../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductList } from '../DTO/ProductDTO';
import { CartService } from '../shared/cart.service';
import { __asyncDelegator } from 'tslib';
import { elementAt } from 'rxjs';
import { UserDto } from '../DTO/userDTO';
import { Toast, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userDetails!: UserDto;
  total: any;
  constructor(private router: Router, private service: UserService, private cartService: CartService, private toast: ToastrService) { }

  ProductList: Array<ProductList> = [];
  addTocart: Array<ProductList> = [];
  ModalTitle!: string;
  ActivateAddEditProductComp: boolean = false;
  ActivateAddEditCartComp: boolean = false;
  Product: any;
  cart: any;
  hiddenData: any;
  ngOnInit() {
    this.userDetails = new UserDto();
    // this.service.HaveAccess();
    this.HiddenFromUser();
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
        this.userDetails = res;
        console.log(JSON.stringify(res));
        sessionStorage.setItem("userId", this.userDetails.id)
      },
      err => {
        console.log(err);
      },
    );

    this.ShowProductList();
  }

  HiddenFromUser() {
    // let 
    this.hiddenData = this.service.HaveAccess()
    // console.log("asdsadasd"+this.hiddenData) 
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
    if (dataItem.qty > 0) {
      let ProductList: Array<ProductList> = [];
      let data = sessionStorage.getItem("addtocart");
      alert(data);
      ProductList = JSON.parse(data || '{}');
      console.log("testinggggg " + ProductList)
      if (data == undefined || data == null) {
        alert("checkiinn")
      }
      if (data == undefined || data == null) 
      {
        alert("1")
        let total = (dataItem.pPrice * dataItem.qty);
        dataItem.total = total;
        ProductList.push(dataItem);
        sessionStorage.setItem('addtocart', JSON.stringify(ProductList));
        this.toast.success("Product Added" + dataItem.productName);
        console.log("!!!!!" + JSON.stringify(JSON.stringify(dataItem.pPrice + " NULL array else change " + dataItem.qty)));
        console.log("!!!!!" + JSON.stringify(JSON.stringify("  NULL array else change " + total)));
        console.log("NULL array else change" + JSON.stringify(JSON.stringify(ProductList)));
        

      } else {
        alert("2")
       // ProductList = JSON.parse(data);
       const found = ProductList.find(e => e.pId == dataItem.pId);

       if (found) {
         let arraytot = (found.qty + dataItem.qty);
         found.qty = arraytot;
         let total = (dataItem.pPrice * arraytot);
         found.total = total;
         // ProductList.push(dataItem);
         sessionStorage.setItem('addtocart', JSON.stringify(ProductList));
         this.toast.success("Qty Updated " + dataItem.productName);
         console.log("!!!!!" + JSON.stringify(JSON.stringify(dataItem.pPrice + " if change " + dataItem.qty)));
         console.log("!!!!!" + JSON.stringify(JSON.stringify("  if change " + total)));
         console.log("if change " + JSON.stringify(ProductList));


       } else {
         let total = (dataItem.pPrice * dataItem.qty);
         dataItem.total = total;
         ProductList.push(dataItem);
         sessionStorage.setItem('addtocart', JSON.stringify(ProductList));
         this.toast.success("Product Added " + dataItem.productName)
         console.log("!!!!!" + JSON.stringify(JSON.stringify(dataItem.pPrice + " else change " + dataItem.qty)));
         console.log("!!!!!" + JSON.stringify(JSON.stringify(" else change " + total)));
         console.log("else change " + JSON.stringify(ProductList));
       }

      }

    }

    else {
      this.toast.warning("Please enter Qty " + dataItem.productName)


    }

  }
}
