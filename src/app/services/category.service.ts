import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  //load all ctaegories
  public categories(){
    return this._http.get(`${baseUrl}/category/`);
  }
  //add categories
  public addCategory(category: any){
    return this._http.post(`${baseUrl}/category/`,category);
  }

  //delete category
  public deleteCategory(cId:any){
    return this._http.delete(`${baseUrl}/category/${cId}`);
  }

  //get single category
  public getCategory(cId:any){
    return this._http.get(`${baseUrl}/category/${cId}`)
  }

  //update category
  public updateCategory(category:any){
    return this._http.put(`${baseUrl}/category/`,category); 
  }
}
