import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { ApiService } from '../../services/ApiService';


@Component({
  selector: 'app-student-add-edit',
  templateUrl: './student-add-edit.component.html',
  styleUrls: ['./student-add-edit.component.css']
})
export class StudentAddEditComponent implements OnInit {
  studentForm: FormGroup;

  constructor(
    private api: ApiService,
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<StudentAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.studentForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.studentForm.patchValue(this.data);
 
  }
  onFormSubmit() {
    if (this.studentForm.valid) {
      const formData = this.studentForm.value;
      if (this.data) {
        // Editing an existing student
        this.api.editUser(this.data.userId, formData).subscribe(
          () => {
            this._coreService.openSnackBar('User Detail updated!');
            this._dialogRef.close(true);
            this.api.getUserList();
          }
        );
      } 
    }
  }
}
