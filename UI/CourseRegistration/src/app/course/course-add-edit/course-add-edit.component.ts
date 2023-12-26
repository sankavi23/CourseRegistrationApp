import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { ApiService } from '../../services/ApiService';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-add-edit',
  templateUrl: './course-add-edit.component.html',
  styleUrls: ['./course-add-edit.component.css']
})
export class CourseAddEditComponent implements OnInit{

  empForm: FormGroup;

  //education: string[] = [
  //  'Matric',
  //  'Diploma',
  //  'Intermediate',
  //  'Graduate',
  //  'Post Graduate',
  //];

  constructor(
    private api: ApiService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<CourseAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.empForm = this._fb.group({
      courseCode: ['',Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  courses: any =[]
  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  loadCourses(): void {
    this.api.getAllCourses().subscribe(
      res => this.courses = res
    );
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      const formData = this.empForm.value;
      if (this.data) {
        this.api.updateCourse(this.data.courseId, formData).subscribe(
          () => {
            this._coreService.openSnackBar('Course Detail updated!');
            this._dialogRef.close(true);
            this.api.getAllCourses();
          }
        );
      } else {
        this.api.addCourse(formData).subscribe(
          () => {
            this._coreService.openSnackBar('Course added successfully');
            this._dialogRef.close(true);
            this.api.getAllCourses();
          });
      }
    }
  }
}
