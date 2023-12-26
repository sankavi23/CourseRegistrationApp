import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { ApiService } from '../../services/ApiService';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-schedule-add-edit',
  templateUrl: './schedule-add-edit.component.html',
  styleUrls: ['./schedule-add-edit.component.css']
})
export class ScheduleAddEditComponent {

  scheduleForm: FormGroup;
  courses: any = []
  schedules: any = [];

  //load course data from database
  //courses = [
  //  'Introduction to Computer Science',
  //  'Web Development Fundamentals',
  //  'Database Management',
  //  'Software Engineering Principles',
  //  'Mobile App Development',
  //];

  //currentCourses: any = []

  fullDayTimeSlots = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
    
  ];

  instructorNames = [
    'John Smith',
    'Jane Doe',
    'Mark Johnson',
    'Emily White',
    'Chris Brown',
    'Sarah Taylor',
    'Michael Davis',
    'Alex Turner',
    'Olivia Martinez',
    'Daniel Wilson',
    
  ];

  days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];

 
  


  constructor(
    private api: ApiService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ScheduleAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.scheduleForm = this._fb.group({
      courseTitle: ['', Validators.required],
      day: ['', Validators.required],
      time: ['', Validators.required],
      instructor: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCourses();
    this.scheduleForm.patchValue(this.data);
    
  }

  onFormSubmit() {
    if (this.scheduleForm.valid) {
      const formData = this.scheduleForm.value;
      if (this.data) {
        this.api.updateSchedule(this.data.scheduleId, formData).subscribe(
          () => {
            this._coreService.openSnackBar('Schedule Detail updated!');
            this._dialogRef.close(true);
            this.loadSchedules();
          }
        );
      } else {
        this.api.addSchedule(formData).subscribe(
          () => {
            this._coreService.openSnackBar('EmpSchedule added successfully');
            this._dialogRef.close(true);
            this.loadSchedules();
          });
      }
    }
    
  }

  loadSchedules(): void {
    this.api.getAllSchedules().subscribe(
      res => this.schedules = res
    );
  }

  //loadCourses(): void {
  //  this.api.getAllCourses().subscribe(
  //    res => this.courses = res
  //  );
  //}

  loadCourses(): void {
    this.api.getAllCourses().subscribe(
      (res: any[]) => {
        this.courses = res.map(course => course.title);
      }
    );
  }



  }
  
  

