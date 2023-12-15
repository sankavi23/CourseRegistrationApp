import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateStudent } from '../../student/models/create-student'

@Injectable({
  providedIn: 'root'
})
export class StudentService {


  constructor(private http: HttpClient) { }


  createStudent(model: CreateStudent): Observable<void> {
    return this.http.post<void>('https://localhost:7286/api/signup', model);
    
  }

  
}







