import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { QuizService } from '../../../quiz.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit{
  categories:any;
  quizzes:any;
  count!:number;
  quizCount!:number;
  users:any;
  userCount!:number;
  activeQuizCount!:number;

  constructor(private _category:CategoryService,private _quiz:QuizService,private _user:UserService){}
  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
      this.count=this.categories.length;
  },
(error)=>{
  console.error('Error fetching data', error);
});

this._quiz.quizzes().subscribe((data:any)=>{
  this.quizzes=data;
  console.log(this.quizzes);
  this.quizCount=this.quizzes.length;
},
(error)=>{
console.error('Error fetching data', error);

});
this._user.getUsers().subscribe((data:any)=>{
this.users=data;
this.userCount=this.users.length;
});

this._quiz.getActiveQuizzes().subscribe((data:any)=>{
  this.activeQuizCount=data.length;
},
(error)=>{
console.error('Error fetching data', error);
});
}

}
