import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/models/Member';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  member: Member;
  user: User;
  constructor(private accountService: AccountService, private memberService: MembersService,
              private toastr: ToastrService) { 
    this.accountService.currentUser$.pipe(take(1)).subscribe(response => this.user = response);
    
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember() {
    
    this.memberService.getMember(this.user.userName).subscribe(response => {
      this.member = response;
    });
    
  }

  updateMember() {
    console.log(this.member);

    this.memberService.updateMember(this.member).subscribe(response => {
      this.toastr.success('Profile Updated');
      this.editForm.reset(this.member);
    })
  }

}
