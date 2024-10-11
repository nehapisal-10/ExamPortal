import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrl: './user-sidebar.component.css'
})
export class UserSidebarComponent implements OnInit{
  categories:any;
  constructor(private _category:CategoryService,private _snack:MatSnackBar){}
  ngOnInit(): void {
    this._category.categories().subscribe(
      (data:any)=>{
        this.categories=data;
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
        });
      }
    );
  }

}
