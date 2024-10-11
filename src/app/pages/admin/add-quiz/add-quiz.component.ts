import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../quiz.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent implements OnInit{
  categories:any;
  quizData={
    title:'',
    description:'',
    maxMarks:'',
    noOfQuestions:'',
    active:true,
    category:{
      cId: '',
    },
  };
  constructor(private _category:CategoryService,private _snack:MatSnackBar,private _quiz:QuizService,private router:Router){}
  ngOnInit(): void {
  this._category.categories().subscribe(
    (data:any)=>{
      //load
      this.categories=data;
      console.log(this.categories);
    },
    (error:any)=>{
      this._snack.open("Server error", "OK", { 
        duration: 3000,
    });
   }
  );
  }
  addQuiz() {
    if(this.quizData.title.trim()=='' || this.quizData.title.trim()==null){
      this._snack.open('Title required','',{
       duration:3000,
      });
      return;
    }

    //server call
    this._quiz.addQuiz(this.quizData).subscribe(
      (data:any)=>{
        this._snack.open('Quiz added successfully!!',"OK",{
          duration:3000,
         });
        this.quizData={
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
