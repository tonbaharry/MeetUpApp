import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  baseUrl = "https://localhost:5001/api/";
  validationErrors: string [] = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.httpClient.get(this.baseUrl + 'ErrorHandling/not-found').subscribe (
      response => { console.log(response)},
      error => {
        console.log(error);
      }
    )
  }

  get400Error(){
    this.httpClient.get(this.baseUrl + 'ErrorHandling/bad-request').subscribe (
      response => { console.log(response)},
      error => {
        console.log(error);
      }
    )
  }

  get500Error(){
    this.httpClient.get(this.baseUrl + 'ErrorHandling/server-error').subscribe (
      response => { console.log(response)},
      error => {
        console.log(error);
      }
    )
  }

  get401Error(){
    this.httpClient.get(this.baseUrl + 'ErrorHandling/auth').subscribe (
      response => { console.log(response)},
      error => {
        console.log(error);
      }
    )
  }

  get400Validation(){
    this.httpClient.post(this.baseUrl + 'account/register', {}).subscribe (
      response => { console.log(response)},
      error => {
        console.log(error);
        this.validationErrors = error;
      }
    )
  }

}
