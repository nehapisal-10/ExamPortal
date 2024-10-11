import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
function validateEmail(email: string): boolean {
  // Regular expression to validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}
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
      this._snack.open("Username is required","ok",{
        duration:3000,
        //verticalPosition:'top',
        //horizontalPosition: 'right',
      });
      return;
    }

    if(this.user.password == '' || this.user.password == null){
      this._snack.open("Password is required","ok",{
        duration:3000,
      });
    return;
    }
    if(this.user.firstName == '' || this.user.firstName == null){
        this._snack.open("First Name is required","ok",{
          duration:3000,
        });
        return;
    }

    if(this.user.lastName == '' || this.user.lastName == null){
          this._snack.open("Last Name is required","ok",{
            duration:3000,
          });
          return;
    }

    if(this.user.email == '' || this.user.email == null){
              this._snack.open("Email is required","ok",{
                duration:3000,
              });
          return;
    }
    if(validateEmail(this.user.email)==false){
      this._snack.open("Invalid email format!", "OK", {
        duration: 3000,
      });
    }
    else{

    //addUser fun call from userService
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //success
        console.log(data);
        this._snack.open("Registered Successfully!!", "OK", {
          duration: 3000,
        });
      },
      (error)=>{
        // Error handling
        console.log(error);
          // Generic error message
          this._snack.open("User Already present!!!", "OK", {
            duration: 3000,
          });
        }
    );}

  }

}
