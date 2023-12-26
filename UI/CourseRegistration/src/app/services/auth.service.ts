import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateForm } from '../helpers/validateform';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //loginForm!: FormGroup
  email: any;

  private baseUrl: string = "https://localhost:7157/api/User"

  private userPayload: any;
  constructor(private http: HttpClient, private router: Router) {
    this.userPayload = this.decodedToken();
  }

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}/register`, userObj);

  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}/authenticate`, loginObj);

  }
  signout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  storeToken(tokenValue: string) {
    localStorage.setItem('token', tokenValue)
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }
  decodedToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    return jwtHelper.decodeToken(token);
  }

  getEmailFromToken() {
    if (this.userPayload)
      return this.userPayload.email;

  }

  getRoleFromToken() {
    if (this.userPayload)
      return this.userPayload.role;

  }

  //onLogin(loginForm:any) {
  //    this.login(loginForm)
  //      .subscribe({
  //        next: (res) => {
  //          //loginForm.reset();
  //          this.storeToken(res.token);
  //          var role = this.getRoleFromToken();
  //          if (role == 'Student') {
  //            this.router.navigate(['user'])
  //          }
  //          else {
  //            this.router.navigate(['myProfile'])
  //          }

  //        }
          
  //      })

  //  } 
  

  
}
