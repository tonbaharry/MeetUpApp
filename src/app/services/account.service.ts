import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import { userInfo } from 'os';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserData = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserData.asObservable();
  
  constructor(private http: HttpClient) { }

  login(model: any)
  {
     return this.http.post(this.baseUrl + 'account/login', model).pipe(
       map ((response: any) => {
        
         const user = response;
         if(user){
           localStorage.setItem('user', JSON.stringify(user));
           
           this.setCurrentUser(user);
         }
       })
     )
  }

  signUp(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map ((response : User)=> {
        if(response){
          localStorage.setItem('user', JSON.stringify(response));
          
          this.setCurrentUser(response);
          
        }
      })
    )

    
  }

  logout(){
    localStorage.removeItem('user');
    console.log()
    this.currentUserData.next(null!);
  }

  setCurrentUser(user: User){
    this.currentUserData.next(user);
    //console.log("cur user "+user.userName)
  }
}
