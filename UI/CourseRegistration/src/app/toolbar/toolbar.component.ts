import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  isAdmin: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router){
  }

  logout(){
    this.isLoggedIn = false;
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
