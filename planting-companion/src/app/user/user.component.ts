import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

export interface UserDialogData {
  isEdit: boolean;
  user?: {
    id: string;
    email: string;
    full_name: string;
    is_active: boolean;
    is_superuser: boolean;
  };
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  imports: [MatCheckboxModule, MatTableModule, MatFormFieldModule, ReactiveFormsModule]
})
export class UserComponent {
  userForm: FormGroup;
  title: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData
  ) {
    this.title = data.isEdit ? 'Edit User' : 'Add User';

    this.userForm = this.fb.group({
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      full_name: [data.user?.full_name || '', Validators.required],
      is_active: [data.user?.is_active || true],
      is_superuser: [data.user?.is_superuser || false],
    });
  }

  save(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
