import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  pageNumber = 1;
  pageSize = 5;
  minAge = 18;
  maxAge = 105;
  OrderBy = 'lastActive';
  gender?:string;
  user: User;
  genderList = [{value: 'male', display: 'Male'}, {value: 'female', display: 'Female'}];

  constructor(private memberService: MembersService, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => this.user = response);
   }

  ngOnInit(): void {
    this.gender = this.user.gender; 
    
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize, this.gender, this.minAge,
                                  this.maxAge, this.OrderBy).subscribe(response => {
      
      this.members = response.result;
      console.log(this.members)
      this.pagination = response.pagination;
      
      for (let j = 0; j < this.members.length; j++) {
        for(let i = 0; i < this.members[i].photos.length; i++)
        {
          if(this.members[j].photos[i].isMain = true)
          {
            this.members[j].photoUrl = this.members[j].photos[i].url;
          }
        }
      }
      
      
    })
  }

  resetFilters() {
    this.loadMembers();
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMembers();
  }

}
 