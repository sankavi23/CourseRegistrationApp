import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from '././homePage/welcome/welcome.component';
import { LoginComponent } from './homePage/login/login.component';
import { SignupComponent } from './homePage/signup/signup.component';
import { StudentComponent } from './students/student.component';
import { CourseComponent } from './course/course.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CourseStudentComponent } from './course-student/course-student.component'
import { StudentScheduleComponent } from '../app/course-student/schedule-view/schedule.component'

const routes: Routes = [
  
 
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'course', component: CourseComponent }, //admin dashboard
  { path: 'user', component: StudentComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'myProfile', component: MyProfileComponent },//student dasboard 
  { path: 'courseStudent', component: CourseStudentComponent },
  { path: 'scheduleStudent', component: StudentScheduleComponent }
  //{ path: 'studentDashboard', component: StudentDashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
