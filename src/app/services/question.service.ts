import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private _http:HttpClient) { }

  //get ques
  public getQuestionsOfQuiz(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qId}`);
  }
  //get ques for test
  public getQuestionsOfQuizForTest(qId:any){
    return this._http.get(`${baseUrl}/question/quiz/${qId}`);
  }

  //get single question
  public getQuestion(qId:any){
    return this._http.get(`${baseUrl}/question/${qId}`);
  }

  //update question
  public updateQuestion(question:any){
    return this._http.put(`${baseUrl}/question/`,question);
  }

  //add question
  public addQuestion(question: any){
    return this._http.post(`${baseUrl}/question/`,question);
  }
  //delete question
  public deleteQuestion(questionId:any){
    return this._http.delete(`${baseUrl}/question/${questionId}`);
  }
}
