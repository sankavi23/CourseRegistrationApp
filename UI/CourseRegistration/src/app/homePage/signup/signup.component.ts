import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective, FormBuilder } from '@angular/forms';
import { CreateStudent } from '../../student/models/create-student';
import { StudentService } from '../../student/services/student.service';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { validateForm } from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({

      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.required]

    })
}


  ngOnInit(): void {

  }

  onSignup() {
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)

      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message)
            this.signUpForm.reset();
            this.router.navigate(['login']);
          },
          error: (err) => {
            alert(err?.error.message)
          }

        })

    } else {

      validateForm.validateAllFormFields(this.signUpForm);
      
    }
  }

  
}
