import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../quiz.service';
import { ConfimDialogComponent } from '../../confim-dialog/confim-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { QuestionService } from '../../../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css'
})

export class InstructionsComponent implements OnInit {
  qId: any;
  quiz: any;
  questions: any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService, private _router: Router, private _dialog: MatDialog, private _question: QuestionService,private _snack:MatSnackBar) { }
  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qId'];
    this._quiz.getQuiz(this.qId).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        this._snack.open("Error in Loading Data!!","Ok",{
          duration:3000,
        });
      }
    );
    this.loadQuestions();
  }
  startQuiz() {
    if (this.questions && this.questions.length != 0) {
      const dialogRef = this._dialog.open(ConfimDialogComponent, {
        width: '300px',
        data: { title: 'Start Quiz', message: 'Are you sure you want to start the quiz?' }
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result == true)
          this._router.navigateByUrl("/start/" + this.qId)
      });
    } else {
      this._snack.open("No questions present in the quiz!!",'Ok',{
        duration:3000,
      });
    }
  }

  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qId).subscribe(
      (data: any) => {
        this.questions = data;
        console.log(this.questions);
        console.log(this.questions.length);
      });
  }
}

