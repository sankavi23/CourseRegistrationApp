
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
@Component({
  selector: 'app-schedule-view',
  templateUrl: './schedule-view.component.html',
  styleUrl: './schedule-view.component.css'
})
export class ScheduleViewComponent {

  scheduleForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ScheduleViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.scheduleForm = this._fb.group({
      courseTitle: '',
      day: '',
      time: '',
      instructor: '',
    });
  }

  ngOnInit(): void {
    console.log('ScheduleViewComponent initialized with data:', this.data);
   
    this.scheduleForm.patchValue(this.data);
  }
}
