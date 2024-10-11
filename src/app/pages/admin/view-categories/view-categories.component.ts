import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../../confim-dialog/confim-dialog.component';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css'
})
export class ViewCategoriesComponent implements OnInit{
  categories:any;

  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _dialog:MatDialog){}

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
        this.categories=data;
        console.log(this.categories);
    },
  (error)=>{
    console.error('Error fetching data', error);
  });
 }
 deleteCategory(cid: any) {
  // Open the confirmation dialog
  const dialogRef = this._dialog.open(ConfimDialogComponent, {
    width: '300px',
    data: { title: 'Delete Category', message: 'Are you sure you want to delete this category?' }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if(result==true)
    
      // If the user confirms, proceed with deletion
      this._category.deleteCategory(cid).subscribe(
        (data: any) => {
          this.categories = this.categories.filter((category: any) => category.cid != cid);
          console.log(this.categories);
          this._snack.open('Category deleted', 'OK', { 
            duration: 3000,
          });
          this.ngOnInit();
        },
        (error: any) => {
          this._snack.open('Server Error', 'OK', { 
            duration: 3000,
          });
        }
      );
    
  });
}
}
