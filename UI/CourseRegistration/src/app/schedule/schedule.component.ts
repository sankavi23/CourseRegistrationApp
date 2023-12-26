import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from '../core/core.service';
import { ScheduleAddEditComponent } from './schedule-add-edit/schedule-add-edit.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { ApiService } from '../services/ApiService';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements AfterViewInit {
  
  scheduleData: any = [];

  displayedColumns: string[] = [
    'course',
    'day',
    'time',
    'instructor',
    'action',
  ];
  coursess: any =[]

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
    this.api.getAllSchedules()
      .subscribe(data => {
        this.scheduleData = data;
        this.getScheduleList();
        console.log(this.scheduleData);
      });
  }

  getScheduleList() {
    this.dataSource = new MatTableDataSource(this.scheduleData.value);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  openAddEditUserForm() {
    const dialogRef = this._dialog.open(ScheduleAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getScheduleList();
        }
      },
    });
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

  deleteScheduleConfirmation(rowId: string): void {
    const dialogRef = this._dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteSchedule(rowId);
        this.loadSchedules();
      }
    });
  }

  deleteSchedule(scheduleId: string) {
    this.api.deleteSchedule(scheduleId).subscribe(() => {
      this._coreService.openSnackBar('Schedule deleted!', 'done');
    });
    
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(ScheduleAddEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getScheduleList();
        }
      },
    });
  }


  loadSchedules(): void {
    this.api.getAllSchedules().subscribe(
      res => this.coursess = res
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
