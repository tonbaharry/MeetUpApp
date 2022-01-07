import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member';
import { PaginationResult } from '../models/pagination';

const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}')?.token
  })
}
@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member [] = [];
  paginatedResult: PaginationResult<Member[]> = new PaginationResult<Member[]>();
  memberCache = new Map();
  
  constructor(private http: HttpClient) { }

  /*
  getMembers() {
    //check if members array is already popualted and avoid call the API if true
    if(this.members.length > 0 )
    {
      return of(this.members);
    } 
    else {
      return this.http.get<Member[]>(this.baseUrl + 'users', httpOptions).pipe(
        map(response => {
          this.members = response;
          console.log(this.members);
          return this.members;
        })
      );  //passes httpsoptions wich contains token in header 
    }
         
  }
  */

  getMembers(page?: number, itemsPerPage?:number, gender?:string, minAge?:number, maxAge?:number,
            orderBy?:string){
              
    var headers = new Headers();
    headers.append("Authorization", 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}')?.token);
    return this.http.get<Member[]>(this.baseUrl + 'users?pageNumber=' + page?.toString() + 
                                  '&pageSize=' + itemsPerPage?.toString() +'&gender=' + gender +
                                   '&orderBy=' + orderBy, httpOptions).pipe(
      map(response => {
        this.paginatedResult.result = response;
        console.log("dfd " + response)
        return this.paginatedResult;
      })
    )
  }
  
  getMember(username: string) { 

    return this.http.get<Member>(this.baseUrl + 'users/' + username, httpOptions);  //passes httpsoptions wich contains token in header      
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users/', member, httpOptions);
  }

  setProfilePhoto(photoId: number) {
    return this.http.put(this.baseUrl + 'users/set-profile-photo/' + photoId, {}, httpOptions);
  }

  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId,  httpOptions);
  }
}
