import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{
  
  public user={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:''
  };
  constructor(private userService:UserService, private _snack:MatSnackBar){}

  ngOnInit(): void {}

  formSubmit() {
    console.log("this.user");
    if(this.user.username == '' || this.user.username == null){
      //alert('User is required!!');
      this._snack.open("username is required","ok",{
        duration:3000,
        //verticalPosition:'top',
        //horizontalPosition: 'right',
      });
      return;
    }

    if(this.user.password == '' || this.user.password == null){
      this._snack.open("password is required","ok",{
        duration:3000,
      });
    return;
    }
    if(this.user.firstName == '' || this.user.firstName == null){
        this._snack.open("firstname is required","ok",{
          duration:3000,
        });
        return;
    }

    if(this.user.lastName == '' || this.user.lastName == null){
          this._snack.open("lastname is required","ok",{
            duration:3000,
          });
          return;
    }

    if(this.user.email == '' || this.user.email == null){
              this._snack.open("email is required","ok",{
                duration:3000,
              });
          return;
    }

    //addUser fun call from userService
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        alert("registered successfully!!");
      },
      (error)=>{
        //error
        console.log(error);
       // alert("something went wrong")
       this._snack.open("something went wrong!!!","ok",{
        duration:3000,
      });
      }
    )

  }

}
