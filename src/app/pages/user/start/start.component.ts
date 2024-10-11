import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfimDialogComponent } from '../../confim-dialog/confim-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent implements OnInit{
  qId:any;
  //array
  questions:any;
  marksGot=0;
  correctAnswers=0;
  attempted=0;
  isSubmit=false;
  timer:any;
  constructor(private locationSt:LocationStrategy,private _route:ActivatedRoute,private _question:QuestionService,private _dialog:MatDialog,private _snack:MatSnackBar){}

  ngOnInit(): void {
    this.preventBackButton();
    this.qId = this._route.snapshot.params['qId'];
    this.loadQuestions();
    
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data:any)=>{
        this.questions=data;
        this.timer=this.questions.length*1*60;

        this.questions.forEach((q:any) => {
          //key value
          q['givenAnswer']='';
        });

        console.log(this.questions);
        console.log(this.questions.length);
        this.startTimer();
      },
      (error)=>{
        this._snack.open("Error in loading Quizzes!!","Ok",{
          duration:3000,
        });
      });
  }
  submitQuiz(){
    this.isSubmit=true;
    this.questions.forEach((q:any)=>{
      if(q.givenAnswer==q.answer){
        this.correctAnswers++;
        let marksSingle=this.questions[0].quiz.maxMarks/this.questions.length;
        this.marksGot += Math.round(marksSingle); // Round off the marks
      }
      if(q.givenAnswer.trim()!=''){
        this.attempted++;
      }
    });
    console.log('Correct answers:'+ this.correctAnswers);
    console.log('Marks Got:'+ this.marksGot);
  }
  SubmitQuizByButton(){
    const dialogRef = this._dialog.open(ConfimDialogComponent, {
      width: '300px',
      data: { title: 'Submit Quiz', message: 'Are you sure you want to submit the quiz?' }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if(result==true)
      this.submitQuiz();
  });
  }

  preventBackButton(){
    history.pushState(null, 'null', location.href);
    this.locationSt.onPopState(()=>{
      history.pushState(null,'null',location.href)
    });
  }

  startTimer() {
    const t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz();
        clearInterval(t);  // Stop the timer
      } else {
        this.timer--;  // Decrease the timer by 1 second
      }
    }, 1000);  // Update every 1000ms (1 second)
  } 
  getFormattedTime(){
    let mm= Math.floor(this.timer/60)
    let ss= this.timer-mm*60
    return `${mm} min: ${ss} sec`;
  }
  printPage(){
    window.print();
  }
}
