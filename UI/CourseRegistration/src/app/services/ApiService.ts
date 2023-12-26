import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../model/user';
import { Course } from '../model/course';



@Injectable({
    providedIn: 'root'
})
export class ApiService {


    private adminBaseUrl: string = 'https://localhost:7157/api/Admin';
    private studentBaseUrl: String = 'https://localhost:7157/api/Student';

    constructor(private http: HttpClient) { }

    //ADMIN
    //getUserList() {
    //  return this.http.get<any>(`${this.adminBaseUrl}/getAllStudents`);
    //}
    getUserList(): Observable<User[]> {
        return this.http.get<User[]>(`${this.adminBaseUrl}/getAllStudents`);
    }

    editUser(userId: string, studentData: any): Observable<any> {
        return this.http.put<any>(`${this.adminBaseUrl}/editStudent/${userId}`, studentData);
    }

    deleteUser(userId: string): Observable<any> {
        return this.http.delete<any>(`${this.adminBaseUrl}/deleteStudent/${userId}`);
    }



    getAllCourses() {
        return this.http.get<any>(`${this.adminBaseUrl}/getAllCourses`);
    }

    addCourse(newCourse: any): Observable<any> {
        return this.http.post<any>(`${this.adminBaseUrl}/addCourse`, newCourse);
    }


    deleteCourse(courseId: string): Observable<any> {
        return this.http.delete<any>(`${this.adminBaseUrl}/deleteCourse/${courseId}`);
    }

    updateCourse(courseId: string, courseData: any): Observable<any> {
        return this.http.put<any>(`${this.adminBaseUrl}/editCourse/${courseId}`, courseData);
    }

    getCourses(): Observable<String[]> {
        return this.http.get<Course[]>(`${this.adminBaseUrl}/getAllcourses`).pipe(
            map(courses => courses.map(course => course.title))
        );
    }


    getAllSchedules() {
        return this.http.get<any>(`${this.adminBaseUrl}/getAllSchedules`);
    }

    addSchedule(newSchedule: any): Observable<any> {
        return this.http.post<any>(`${this.adminBaseUrl}/addSchedule`, newSchedule);
    }

    updateSchedule(scheduleId: string, scheduleData: any): Observable<any> {
        return this.http.put<any>(`${this.adminBaseUrl}/editSchedule/${scheduleId}`, scheduleData);
    }

    deleteSchedule(scheduleId: string): Observable<any> {
        return this.http.delete<any>(`${this.adminBaseUrl}/deleteSchedule/${scheduleId}`);
    }
   getScheduleById(scheduleId: string): Observable<any> {
     return this.http.get<any>(`${this.adminBaseUrl}/getScheduleByCourseId/${scheduleId}`);
    }



    //STUDENT
    enrolCourse() {
    }

    editProfile(userId: string, studentData: any): Observable<any> {
        return this.http.put<any>(`${this.adminBaseUrl}/editStudent/${userId}`, studentData);
    }

  getUser(emailId: string): Observable<any> {
    return this.http.get<any>(`${this.studentBaseUrl}/getStudentByEmail`);
  }

}
