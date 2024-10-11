import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../../confim-dialog/confim-dialog.component';

@Component({
  selector: 'app-view-quiz-questions',
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css'
})
export class ViewQuizQuestionsComponent implements OnInit{
  qId:any;
  qTitle:any;
  questions:any;

  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar,private _dialog:MatDialog,private router:Router){}

  ngOnInit(): void {
    this.qId=this._route.snapshot.params['qId'];
    this.qTitle=this._route.snapshot.params['title'];
    this._question.getQuestionsOfQuiz(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
        });
      }      
    );
  }
  //delete question
  deleteQuestion(qid:any){
    const dialogRef = this._dialog.open(ConfimDialogComponent, {
      width: '300px',
      data: { title: 'Delete Quiz', message: 'Are you sure you want to delete this quiz?' }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if(result==true)
    this._question.deleteQuestion(qid).subscribe(
      (data:any)=>{
        this.questions = this.questions.filter((question: any) => question.qid != qid);
        this._snack.open("Question deleted", "OK", { 
          duration: 3000,
        });
        this.ngOnInit();
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
        });
      }
    );
    });
  }
  updateQuestion(questionId:number,quizId:number,quizTitle:String){
    // this.router.navigateByUrl('/admin/question/' +questionId);
    this.router.navigate(['/admin/question/'+quizId+'/'+quizTitle+'/'+questionId]);
    // alert(quizId);
  }

}
