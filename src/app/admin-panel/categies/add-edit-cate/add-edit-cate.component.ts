import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-edit-cate',
  templateUrl: './add-edit-cate.component.html',
  styleUrls: ['./add-edit-cate.component.css']
})
export class AddEditCateComponent implements OnInit {

  constructor(private service:UserService) { }

  @Input() cat:any;
  catId!:string;
  categoryName!:string;

  ngOnInit(): void {
    this.catId=this.cat.catId;
    this.categoryName=this.cat.categoryName;
  }

  addDepartment(){
    var val = {catId:this.catId,
      categoryName:this.categoryName};
    this.service.addCateList(val).subscribe(res=>{
      alert(res.toString());
      // console.log(val)
    });
  }

  updateDepartment(){
    var val = {catId:this.catId,
      categoryName:this.categoryName};
    this.service.updateCateList(val).subscribe(res=>{
    alert(res.toString());
    console.log(val)
    });
  }

}


