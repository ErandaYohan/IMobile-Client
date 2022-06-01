import { Component, Input, OnInit } from '@angular/core';
import { AddressDTO } from 'src/app/DTO/AddressDTO';
import { ProductList } from 'src/app/DTO/ProductDTO';
import { UserDto } from 'src/app/DTO/userDTO';
import { CartService } from 'src/app/shared/cart.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  gTotal:number=0;
  ProductList: Array<ProductList>=[];
  public products: any = [];
  public userDto!: UserDto;
  
  constructor(private cartService: CartService, private service: UserService) { }

  ngOnInit(): void {
    this.userDto=new UserDto();
    this.userDto.address=new AddressDTO();
    // this.userDto.

    // this.gTotal=0;
    let data =sessionStorage.getItem("addtocart");
    if(data != undefined || data != null)
    {
      this.ProductList=JSON.parse(data);
      console.log("data--- .>>"+ this.ProductList);
      this.getGTotal()
    }else{
      alert("null")
    }
    
    

    // this.cartService.getProducts()
    //   .subscribe(res => {
    //     this.products = res;
    //     this.grandTotal = this.cartService.getTotalPrice();
    //   })
  }
  getGTotal(){
    var sum = this.ProductList.reduce((acc, cur) => acc + cur.total, 0);
    this.gTotal=sum;
console.log(sum)
    // for (i = 0; i < gTotal.length; i++) {
    //   sum += arguments[i];
    // }
  }


  removeItem(item:ProductList) {
    
    const found = this.ProductList.find(e => e.pId == item.pId);
    const index: number = this.ProductList.indexOf(item);
    alert(index);
    if (index !== -1) {
      this.ProductList.splice(index, 1);
    } 
    sessionStorage.setItem("addtocart",JSON.stringify(ProductList))
  }

  emptycart() {
    sessionStorage.removeItem("addtocart")
  }

  api() {
    alert("####"+sessionStorage.getItem("userId")as string);
    // this.userDto.id=null;
    // let data=;
    this.userDto.id=sessionStorage.getItem("userId")as string;
    
    this.userDto.fname;
    this.userDto.lname;
    this.userDto.mobile;
    this.userDto.address.city;
    this.userDto.address.cityCode;
    this.userDto.address.postalCode;
    this.userDto.productionLiat=this.ProductList;

    console.log("@@@@@ "+JSON.stringify(this.userDto));
    // this.cartService.passApi(this.userDto);

    this.cartService.passApi(this.userDto).subscribe(response => {

      console.log("response 111111 "+response)
      if(response!= null ||response!= undefined){
        console.log("response "+response)
      }

    },
    error => {
      this.service.handleError(error);
    });
  
  
  }
  
    

}
function addtocart(addtocart: any) {
  throw new Error('Function not implemented.');
}

