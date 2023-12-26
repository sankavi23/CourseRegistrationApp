import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { CoreService } from '../core/core.service';
//import { ScheduleAddEditComponent } from './schedule-add-edit/schedule-add-edit.component'
import { Router } from '@angular/router';
import { ApiService } from '../../services/ApiService';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class StudentScheduleComponent implements AfterViewInit {
  
  scheduleData: any = [];

  displayedColumns: string[] = [
    'course',
    'day',
    'time',
    'instructor'
    
  ];
  coursess: any =[]

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api: ApiService,
    private router: Router,
    private _dialog: MatDialog,
    
  ) { }

  ngOnInit(): void {
    this.api.getAllSchedules()
      .subscribe(data => {
        this.scheduleData = data;
        this.getScheduleList();
      });
  }

  getScheduleList() {
    this.dataSource = new MatTableDataSource(this.scheduleData.value);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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


  

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
