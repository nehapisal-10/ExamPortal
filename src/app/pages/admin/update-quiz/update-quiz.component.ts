import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css'
})
export class UpdateQuizComponent implements OnInit{
  qId = 0;
  quiz:any;
  categories:any;

  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private _snack:MatSnackBar,private _category:CategoryService,private router:Router){}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    //alert(this.qId);
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
         this.quiz=data;
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
      }
    );
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

  //update form submit
  public updateData(){
    if(this.quiz.title.trim()=='' || this.quiz.title==null){
      this._snack.open('All fields are required!!', '', {
        duration: 3000,
      });
      return;
    }
    this._quiz.updateQuiz(this.quiz).subscribe(
      (data:any)=>{
        this._snack.open("Quiz Updated successfully!!", "OK", { 
          duration: 3000,
      });
         
         this.quiz={
          title:'',
          description:'',
          maxMarks:'',
          noOfQuestions:'',
          active:true,
          category:{
            cId: '',
          }
        }; 
        this.router.navigate(['/admin/view-quizzes']);
      },
      (error)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
      }
    );    
  }

}
