import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";

@Injectable()
export class AuthIntercepter implements HttpInterceptor{
    constructor(private login:LoginService){}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): 
    Observable<HttpEvent<any>> {
       //add the Jwt token that is stored in local storage
       let authReq = req;
       const token = this.login.getToken();
       if(token!=null){
            authReq=authReq.clone({
                setHeaders:{Authorization:`Bearer ${token}`},
            });
       }
       return next.handle(authReq);
    }

}
export const AuthIntercepterProviders=[
    {
        provide:HTTP_INTERCEPTORS,
        useClass: AuthIntercepter,
        multi: true,
    },
];