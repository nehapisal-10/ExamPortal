import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent implements OnInit{
  cId = 0;
  category:any;

  constructor(private _category:CategoryService,private _snack:MatSnackBar,private router:Router,private _route:ActivatedRoute){}

  ngOnInit(): void {
    this.cId = this._route.snapshot.params['cId'];
    this._category.getCategory(this.cId).subscribe(
      (data:any)=>{
         this.category=data;
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
      }
    );
  }

  public updateCategory(){
      if(this.category.title.trim()=='' || this.category.description.trim()==null){
          this._snack.open("Title Required!!",'',{
            duration:3000 
          });
          return;
      }
  
      this._category.updateCategory(this.category).subscribe(
        (data:any)=>{
          this._snack.open("Category Updated successfully!!", "OK", { 
            duration: 3000,
        });
           
           this.category={
            title:'',
            description:'',
          }; 

          this.router.navigate(['/admin/categories']);
        },
        (error)=>{
          this._snack.open("Server error", "OK", { 
            duration: 3000,
        });
        }
      );  
      
  }

}
