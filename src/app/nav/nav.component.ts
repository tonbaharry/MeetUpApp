import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;
  gender: string;

  constructor(public accountService: AccountService, private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  login () {
    console.log(this.model);
    this.accountService.login(this.model).subscribe(response => {
      this.loggedIn = true;
      this.router.navigateByUrl('/members')
    },
    error => {
       console.log(error);
       this.toastr.error(error.error);
       
    });
  }

  logout () {
    this.accountService.logout();
    this.loggedIn = false;
    this.router.navigateByUrl('/')
  }

  getCurrentUser() {
    
    this.accountService.currentUser$.subscribe(
      user=> {
        this.loggedIn = !!user;
      },
      error => {
        console.log("nav component.ts 49" + error);
      }
    );
  }

}
