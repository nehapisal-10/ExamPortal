import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../quiz.service';

export interface Question {
  quiz: {
    qId: string;
  };
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}
export interface Quiz {
  qId:String;
  qTitle:String;
}
@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrl: './update-question.component.css'
})
export class UpdateQuestionComponent implements OnInit {
  @Input() quizId!:number;
  @Input() quizTitle:String='';
  qId!: string;  // or `qId: string = '';` if you prefer
  qTitle!: string; // or `qTitle: string = '';`
  quizzes: Quiz[] = []; // Initialize with an empty array
  question: Question = {
    quiz: {
      qId: '',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };
  constructor(private _route:ActivatedRoute,private _question:QuestionService,private _snack:MatSnackBar,private _quiz:QuizService,private router:Router){}
  
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.quizTitle = this._route.snapshot.params['title'];
    this.quizId=this._route.snapshot.params['quizId']
    // alert(this.qTitle);
    this._question.getQuestion(this.qId).subscribe(
      (data:any)=>{
         this.question=data;
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
      }
    );
    this._quiz.quizzes().subscribe(
      (data:any)=>{
         this.quizzes=data;
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
      }
    );
  }

   //update form submit
   public updateQuestion(){
    if(this.question.content.trim()=='' || this.question.content==null){
      this._snack.open('All fields are required!!', '', {
        duration: 3000,
      });
      return;
    }
    this._question.updateQuestion(this.question).subscribe(
      (data:any)=>{
        this._snack.open("Quiz Updated successfully!!", "OK", { 
          duration: 3000,
      });
         
         this.question={
          content: '',
          answer : '',
          option1:'',
          option2:'',
          option3:'',
          option4:'',
          quiz:{
            qId: '',
          }
        }; 
        // alert('/admin/view-questions/'+this.quizId+'/'+this.quizTitle)
        this.router.navigate(['/admin/view-questions/'+this.quizId+'/'+this.quizTitle]); 

      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
      }
    );    
  }

}
