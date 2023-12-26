
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { Router } from '@angular/router';
import { ScheduleViewComponent } from './schedule-view/schedule-view.component';
import { ApiService } from '../services/ApiService';




@Component({
  selector: 'app-course-student',
  templateUrl: './course-student.component.html',
  styleUrl: './course-student.component.css'
})
export class CourseStudentComponent implements OnInit {

  isAdmin: boolean = false;
  courseData: any = [];
  scheduleData:any = []

  displayedColumns: string[] = [
    'courseCode',
    'title',
    'description',
    'action',
  ];
  displayedColumns2: string[] = [
    'courseTitle',
    'day',
    'time',
    'description',
  ];

  dataSource!: MatTableDataSource<any>;
  dataSource2!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router, 
    private _dialog: MatDialog,
    private _coreService: CoreService
  ) { }

  data: any;

  ngOnInit(): void {
    this.api.getAllCourses()
      .subscribe(data => {
        this.courseData = data;
        this.getCourseList()
      });

  }
 
  getCourseList() {

    this.dataSource = new MatTableDataSource(this.courseData.value);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  getScheduleList() {
    this.dataSource2 = new MatTableDataSource(this.scheduleData.value);
    this.dataSource2.sort = this.sort;
    this.dataSource2.paginator = this.paginator;
  }
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //openScheduleForm(courseId: string) {
  //  var data: any;

  //  this.api.getScheduleById(courseId).subscribe(
  //    (result) => {
  //      data = result;
  //      console.log(data)
  //    }
  //  );
  //  const dialogRef = this._dialog.open(ScheduleViewComponent, {data,});

  //  dialogRef.afterClosed().subscribe({
  //    next: (val) => {
  //      if (val) {
  //        this.getCourseList();
  //      }
  //    },
  //  });
  //}

  openScheduleForm(courseId: string) {
    this.api.getScheduleById(courseId).subscribe(
      (result) => {
        this.scheduleData = result;
        //console.log(data)
      }
    );
  }

  getScheduleById(): void {
    
  }



  enrolCourse(id: number) {

  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
