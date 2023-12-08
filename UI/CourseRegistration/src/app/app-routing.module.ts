import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '././homePage/welcome/welcome.component';
import { LoginComponent } from './homePage/login/login.component';
import { SignupComponent } from './homePage/signup/signup.component';

const routes: Routes = [
  
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
