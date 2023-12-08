import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  model = {
    First: '',
    email: '',
    password: '',
  };

  submitForm() {
    // Add your registration logic here
    console.log('Form submitted:', this.model);
  }

}
