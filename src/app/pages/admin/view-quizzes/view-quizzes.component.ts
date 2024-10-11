import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../../confim-dialog/confim-dialog.component';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css'
})
export class ViewQuizzesComponent implements OnInit{
  quizzes: any;

  constructor(private _quiz:QuizService,private _snack:MatSnackBar,private _dialog:MatDialog){}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe((data:any)=>{
      this.quizzes=data;
      console.log(this.quizzes);
  },
(error)=>{
  console.error('Error fetching data', error);
  this._snack.open("Error fetching data",'',{
    duration:3000,
  });
});
}


//delete quiz
deleteQuiz(qId:any){
  const dialogRef = this._dialog.open(ConfimDialogComponent, {
    width: '300px',
    data: { title: 'Delete Quiz', message: 'Are you sure you want to delete this quiz?' }
  });

  dialogRef.afterClosed().subscribe((result) => {
    if(result==true)
   this._quiz.deleteQuiz(qId).subscribe(
    (data:any)=>{
      this.quizzes=this.quizzes.filter((quiz:any)=>quiz.qId != qId);
      this._snack.open("Quiz deleted successfully!!","Ok",{
        duration:3000,
      });
    },
    (error:any)=>{
      this._snack.open("Error deleting the quiz",'',{
        duration:3000,
      });
    }
  );
});
}

}
