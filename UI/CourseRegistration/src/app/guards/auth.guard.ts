import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router, private toast: NgToastService) { }

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    } else {
      console.log("please login ");
      this.toast.error({detail:"SUCCESS", summary: "Please login firtst"});
      this.router.navigate(["login"])
      return false;
    }
  }
}
