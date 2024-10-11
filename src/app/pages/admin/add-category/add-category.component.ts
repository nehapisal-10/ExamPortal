import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit{
  category={
    title:'',
    description:''
  };
  constructor(private _category:CategoryService, private _snack:MatSnackBar,private router:Router){
  }
  ngOnInit(): void {
  }
  formSubmit(){
    if(this.category.title.trim()=='' || this.category.description.trim()==null){
        this._snack.open("Title Required!!",'',{
          duration:3000 
        });
        return;
    }

    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.category.title='';
        this.category.description='';
        this._snack.open("Category added successfully!!", "OK", { 
          duration: 3000,
      });
        this.router.navigate(['/admin/categories']);
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
     });
  }

}
