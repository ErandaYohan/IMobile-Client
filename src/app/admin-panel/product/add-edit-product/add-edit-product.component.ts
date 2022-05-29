import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  constructor(private service:UserService) { }

  @Input() Product:any;
    pId!:string;
    productName!:string;
    pDes!:string;
    pPrice!:string;
    img!:string;
    category!:string;
    PhotoFilePath!:string;
    categoryList:any=[];

  ngOnInit(): void {
    this.loadCategoriesList();
  }

  loadCategoriesList(){
    this.service.getAllCategoriesNames().subscribe((data:any)=>{
      this.categoryList=data;

      this.pId=this.Product.pId;
      this.productName=this.Product.productName;
      this.pDes=this.Product.pDes;
      this.pPrice=this.Product.pPrice;
      this.img=this.Product.img;
      this.PhotoFilePath=this.service.PhotoUrl+this.img;
      this.category=this.Product.category;
      console.log(this.categoryList)
    });
  }

  addProduct(){
    var val = {pId:this.pId,
      productName:this.productName,
      pDes:this.pDes,
      pPrice:this.pPrice,
      img:this.img,
      category:this.category};
    this.service.addProductList(val).subscribe(res=>{
      alert(res.toString());
      // console.log(val)
    });
  }

  updateProduct(){
    var val = {pId:this.pId,
      productName:this.productName,
      pDes:this.pDes,
      pPrice:this.pPrice,
      img:this.img,
      category:this.category};
    this.service.updateProductList(val).subscribe(res=>{
    alert(res.toString());
    console.log(val)
    });
  }

  uploadPhoto(event:any){
    var file=event.target.files[0];
    const formData:FormData=new FormData();
    formData.append('uploadedFile',file,file.name);

    this.service.UploadPhoto(formData).subscribe((data:any)=>{
      this.img=data.toString();
      this.PhotoFilePath=this.service.PhotoUrl+this.img;
    })
  }

}
