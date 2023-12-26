
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { StudentAddEditComponent } from './student-add-edit/student-add-edit.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { ApiService } from '../services/ApiService';
import { User } from '../model/user';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  
  userData: any = []

  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'email',
    'address',
    'phoneNo',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.api.getUserList().subscribe(res => {
      this.userData = res;
      this.getUserList();
      console.log(this.userData);
    });
  }

  getUserList() {
    this.dataSource = new MatTableDataSource(this.userData.value);
    //this.dataSource.sort = this.sort;
    //this.dataSource.paginator = this.paginator;
  }

  openAddEditUserForm() {
    const dialogRef = this._dialog.open(StudentAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUserConfirmation(rowId: string): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed, perform the delete action here
        this.deleteUser(rowId);
      }
    });
  }

  deleteUser(userId: string) {
    this.api.deleteUser(userId).subscribe(() => {
      this._coreService.openSnackBar('Student deleted!', 'done');
      this.api.getUserList();
    });

  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(StudentAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUserList();
        }
      },
    });
  }

    logout() {
      localStorage.clear();
      this.router.navigate(['/']);
    }
}
