import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateForm } from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: NgToastService 
  ) { }


  ngOnInit(): void{
    this.loginForm = this.fb.group({

      emailId: ['', Validators.required],
      password: ['', Validators.required]
      
    })
  }

  //onLogin() {

  //  if (this.loginForm.valid) {
  //    //console.log(loginForm.value)
  //    this.auth.onLogin(this.loginForm.value);

  //  } else {

  //    validateForm.validateAllFormFields(this.loginForm);

  //  }
  //}

  onLogin() {
    if(this.loginForm.valid) {
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
        .subscribe({
          next: (res) => {
            
            this.loginForm.reset();
            this.auth.storeToken(res.token);
            var role = this.auth.getRoleFromToken();
            this.toast.success({ detail: "SUCCESS", summary: res.message, duration: 5000 });
            if (role == 'Admin') {
              this.router.navigate(['user'])
            }
            else {
              this.router.navigate(['myProfile'])
            }
          },
          error: (err) => {
            this.toast.error({ detail: "ERROR", summary: "Something went wrong", duration: 5000 });
            alert("User not Found!")
          }
        })
    } else {
      validateForm.validateAllFormFields(this.loginForm);
    }
  }

 }



