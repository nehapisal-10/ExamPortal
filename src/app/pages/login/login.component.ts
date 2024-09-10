import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
    loginData={
      username: '',
      password: ''
    };
  loginStatusSubject: any;

    constructor(private snack: MatSnackBar, private login:LoginService, private router: Router){}

    ngOnInit(): void {
      
    }

    formSubmit(){
      console.log('login button clicked');

      if(this.loginData.username.trim()=='' || this.loginData.username==null){
        this.snack.open('Username is required!!', '', {
          duration: 3000,
        });
        return;
      }
      if(this.loginData.password.trim()=='' || this.loginData.password==null){
        this.snack.open('Password is required!!', '', {
          duration: 3000,
        });
        return;
      }
      //request server to generate token
      this.login.generateToken(this.loginData).subscribe(
        (data:any)=>{
          console.log("success");
          console.log(data);

          //login user
          this.login.loginUser(data.token);

          this.login.getCurrentUser().subscribe(
            (user:any)=>{
             this.login.setUser(user);
             console.log(user); 

             //redirect as per user role
              if(this.login.getUserRole()=="ADMIN"){

                //admin dashboardn'
                window.location.href= '/admin'
                 this.router.navigate(['admin']);
                 this.loginStatusSubject.next(true);
                location.reload();

              } else if(this.login.getUserRole()=="NORMAL"){

                //user dashboard
                window.location.href= '/user-dashboard'
                 this.router.navigate(['user-dashboard']);
                 this.loginStatusSubject.next(true);
                location.reload();


              }else {

                //stay on login page
                this.login.logout();

              }
            });
        },
        (error:any)=>{
          console.log("error");
          console.log(error);
          this.snack.open("Invalid details!! try again",'',{
            duration:3000,
          });
        }
      );
    }
}
