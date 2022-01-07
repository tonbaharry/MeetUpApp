import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFormFile } from '../models/IFormFile';


const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user'))?.token,
    'Content-Type': 'application/json'
  })
}



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  baseUrl = environment.apiUrl;
  model : IFormFile;
  constructor (private httpClient: HttpClient) { }

  // Returns an observable
  upload(file: any, username: string):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);

     
   //this.model.username = "tubotonba.harry";
   //this.model.FileToUpload = formData;
   
    // Make http post request over api
    // with formData as req
    const FileToUpload = {'username': 'tubotonba.harry', 'FileToUpload': file};
    console.log(FileToUpload);
    return this.httpClient.post(this.baseUrl + 'users/add-photo', FileToUpload, httpOptions)
  }
}
