import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../quiz.service';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css'
})
export class LoadQuizComponent implements OnInit{
  catId:any;
  quizzes:any;
  questions:any;
  constructor(private _route:ActivatedRoute,private _quiz:QuizService,private router:Router,private _question:QuestionService,private _snack:MatSnackBar){}
  ngOnInit(): void {
    this._route.params.subscribe((params)=>{
      console.log(params);
      this.catId=params['catId'];
      if(this.catId==0){
        console.log("Load all the quiz");
        this._quiz.getActiveQuizzes().subscribe((data:any)=>{
          this.quizzes=data;
          console.log(this.quizzes);
        },
      (error)=>{
        this._snack.open("Error in loading Quizzes!!","Ok",{
          duration:3000,
        }); 
      });
      }else{
        console.log("Load specific quiz");
        this._quiz.getActiveQuizzesOfCategory(this.catId).subscribe(
          (data:any)=>{
            this.quizzes=data;
          },
          (error)=>{
            this._snack.open("Error in loading Quizzes!!","Ok",{
              duration:3000,
            });
          }
        );
      }
    });
  }
}
