import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { TokenInterceptor } from './interceptors/token.interceptor';


import { WelcomeComponent } from './homePage/welcome/welcome.component';
import { SignupComponent } from './homePage/signup/signup.component';
import { LoginComponent } from './homePage/login/login.component';





import { RouterModule, Routes } from '@angular/router';


import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';


import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { CourseComponent } from './course/course.component';
import { StudentComponent } from './students/student.component';
import { StudentAddEditComponent } from './students/student-add-edit/student-add-edit.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { ScheduleAddEditComponent } from './schedule/schedule-add-edit/schedule-add-edit.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { FooterComponent } from './footer/footer.component';
import { CourseAddEditComponent } from './course/course-add-edit/course-add-edit.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { CourseStudentComponent } from './course-student/course-student.component';
import { ScheduleViewComponent } from './course-student/schedule-view/schedule-view.component'
import { StudentScheduleComponent } from '../app/course-student/schedule-view/schedule.component'

//import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    CourseAddEditComponent,
    CourseComponent,
    ToolbarComponent,
    StudentComponent,
    StudentAddEditComponent,
    MyProfileComponent,
    ScheduleComponent,
    ScheduleAddEditComponent,
    FooterComponent,
    ConfirmationDialogComponent,
    CourseStudentComponent,
    ScheduleViewComponent,
    StudentScheduleComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatCardModule,
    MatTooltipModule
    
    //CarouselModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
