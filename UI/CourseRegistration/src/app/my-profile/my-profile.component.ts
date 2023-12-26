import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StudentAddEditComponent } from '../students/student-add-edit/student-add-edit.component';
import { Router } from '@angular/router';
import { UserStoreService } from '../services/user-store.service';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{
  

  user: any;

  public email: any;

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private store: UserStoreService,
    private router: Router,
    private _dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getUserData();
  }

  



  getUserData(): void {
    this.api.getUser(this.email).subscribe(
      (data) => {
        this.user = data.value;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(StudentAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          // this.getUserList();
        }
      },
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
