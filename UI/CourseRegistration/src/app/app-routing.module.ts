import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from '././homePage/welcome/welcome.component';
import { LoginComponent } from './homePage/login/login.component';
import { SignupComponent } from './homePage/signup/signup.component';
import { StudentDashboardComponent } from './student/components/student-dashboard/student-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  
  { path: '', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'studentDashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] },
  { path: 'adminDashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
