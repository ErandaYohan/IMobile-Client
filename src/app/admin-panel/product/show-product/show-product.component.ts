import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/DTO/CategoriesDTO';
import { ProductList } from 'src/app/DTO/ProductDTO';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {

  constructor(private service:UserService) { }

  ProductList: Array<ProductList>=[];
  ModalTitle!: string;
  ActivateAddEditProductComp:boolean=false;
  Product:any;


  ngOnInit(): void {
    this.refreshProductList();
    
  }


  addClick(){
    this.Product={
      pId:0,
      productName:"",
      pDes:"",
      pPrice:"",
      img:"",
      category:""
    }
    this.ModalTitle="Add Product";
    this.ActivateAddEditProductComp=true;
    
  }

  closeClick(){
    this.ActivateAddEditProductComp=false;
    this.refreshProductList();
  }

  refreshProductList(){
    this.service.getProductList().subscribe(data=>{
      
      if(data != null){
        this.ProductList=data;
        console.log("Res "+JSON.stringify( this.ProductList[0].pId))
        // console.log("Array "+JSON.stringify(this.CategoriesList[0]))
      }
      
    })
    
  }

  // delete(obj:Categories){
  //   //alert(""+JSON.stringify(obj))
  //   // alert(""+JSON.parse(obj))
  //   this.service.deleteCateList(obj.catId).subscribe(data=>{
      
  //     if(data != null){
  //      alert("Delete")
  //     }else{
  //       alert("NO Delete")
  //     }
      
  //   })
  // }

  deleteClick(pId:number){
    if(confirm('Are you sure??')){
      this.service.deleteProductList(JSON.stringify(pId)).subscribe(data=>{
        alert(data.toString());
        this.refreshProductList();
        // console.log(item)
      })
    }
  }

  editClick(item: any){
    this.Product=item;
    this.ModalTitle="Edit Product";
    this.ActivateAddEditProductComp=true;
  }

}
