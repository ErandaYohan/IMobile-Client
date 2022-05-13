import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/DTO/CategoriesDTO';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-show-cate',
  templateUrl: './show-cate.component.html',
  styleUrls: ['./show-cate.component.css']
})
export class ShowCateComponent implements OnInit {

  constructor(private service:UserService) { }

  CategoriesList: Array<Categories>=[];
  ModalTitle!: string;
  ActivateAddEditCatComp:boolean=false;
  cat:any;


  ngOnInit(): void {
    this.refreshCatList();
    
  }


  addClick(){
    this.cat={
      catId:0,
      categoryName:""
    }
    this.ModalTitle="Add Department";
    this.ActivateAddEditCatComp=true;
    
  }

  closeClick(){
    this.ActivateAddEditCatComp=false;
    this.refreshCatList();
  }

  refreshCatList(){
    this.service.getCateList().subscribe(data=>{
      
      if(data != null){
        this.CategoriesList=data;
        console.log("Res "+JSON.stringify( this.CategoriesList[0].catId))
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

  deleteClick(catId:string){
    if(confirm('Are you sure??')){
      this.service.deleteCateList(catId).subscribe(data=>{
        alert(data.toString());
        this.refreshCatList();
        // console.log(item)
      })
    }
  }

  editClick(item: any){
    this.cat=item;
    this.ModalTitle="Edit Department";
    this.ActivateAddEditCatComp=true;
  }

}
