import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './homePage/welcome/welcome.component';
import { LoginComponent } from './homePage/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './homePage/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
