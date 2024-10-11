import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';

//Define an interface for the question object
interface Question {
  quiz: {
    qId?: string;
  };
  content: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answer: string;
}

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  qId:any;
  qTitle:any;
  question = {
    quiz: {
      qId:'',
    },
    content: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    answer: ''
  };
  
  constructor(private _route: ActivatedRoute,private _snack:MatSnackBar,private _question:QuestionService) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this.qTitle = this._route.snapshot.params['qTitle'];
    console.log(this.qTitle);
    if (this.qId) {
      this.question.quiz.qId= this.qId;
    } else {
      console.error('No quiz ID found in route parameters');
    }
  }

  formSubmit(){
    if(this.question.content.trim()=='' || this.question.content==null){
      return;
    }
    if(this.question.option1.trim()=='' || this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()=='' || this.question.option2==null){
      return;
    }
    if(this.question.option3.trim()=='' || this.question.option3==null){
      return;
    }
    if(this.question.option4.trim()=='' || this.question.option4==null){
      return;
    }
    if(this.question.answer.trim()=='' || this.question.answer==null){
      return;
    }
    //form submit
    this._question.addQuestion(this.question).subscribe(
      (data:any)=>{
        this._snack.open("Question added successfully", "OK", { 
          duration: 3000,
      });
      this.question.content='';
      this.question.option1='';
      this.question.option2='';
      this.question.option3='';
      this.question.option4='';
      this.question.answer='';
      },
      (error:any)=>{
        this._snack.open("Server error", "OK", { 
          duration: 3000,
      });
      }
    );
  }
}
