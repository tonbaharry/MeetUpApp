import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Output() cancelSignUp = new EventEmitter();
  model: any = {};
  signUpForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18); //18 years age limimt
  }

  initializeForm() {
    //this.signUpForm = new FormGroup ({
    this.signUpForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [ Validators.required, this.matchValues("password")]],
      confirmPassword: ['', [ Validators.required, this.matchValues("password")]],
      gender: ['male'],
      KnownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    this.signUpForm.controls.password.valueChanges.subscribe(() => {
      this.signUpForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  matchValues(matchTo: string): ValidatorFn {return (control: AbstractControl) => {
       return control?.value === (control?.parent?.controls as { [key: string]: AbstractControl })[matchTo].value ? 
        null : {isMatching: true}
     }

    
  }

}


