import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseAddEditComponent } from './course-add-edit/course-add-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
 // isAdmin: boolean = false;
  courseData: any = []

  displayedColumns: string[] = [
    'courseCode',
    'title',
    'description',
    'action',
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  courses: any = []
  constructor(
    private api: ApiService,
    private router: Router,
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.api.getAllCourses()
      .subscribe(data => {
        this.courseData = data;
        this.getCourseList()
      });
  }
  getCourseList() {
    this.dataSource = new MatTableDataSource(this.courseData.value);
    console.log(this.courseData);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  loadCourses(): void {
    this.api.getAllCourses().subscribe(
      res => this.courses = res
    );
  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  openAddEditEmpForm() {
    const dialogRef = this._dialog.open(CourseAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseList();
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


  deleteCourseConfirmation(rowId: string): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // User confirmed, perform the delete action here
        this.deleteCourse(rowId);
        
      }
    });
  }

  deleteCourse(courseId: string) {
    this.api.deleteCourse(courseId).subscribe(() => {
      this._coreService.openSnackBar('Course deleted!', 'done');
      this.api.getAllCourses();
      
    });

  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CourseAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getCourseList();
        }
      },
    });
  }

  

}
