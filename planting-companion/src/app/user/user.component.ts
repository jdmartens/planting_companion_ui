import { Component, EventEmitter, Input, Output, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { passwordMatchValidator } from '../validators/password-match.validator';

export interface UserDialogData {
  isEdit: boolean;
  user?: {
    id: string;
    email: string;
    full_name: string | null;
    is_active: boolean;
    is_superuser: boolean;
  };
}

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnChanges {
  @Input() title: string = '';
  @Input() user: any | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  isAdd: boolean = false;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form without password fields
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      is_active: [true],
      is_superuser: [false],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Check if title has changed and determine if it's "Add User"
    if (changes['title'] && this.title) {
      this.isAdd = this.title.toLowerCase().includes('add');

      // Add password fields if in "Add User" mode
      if (this.isAdd && !this.userForm.contains('password')) {
        this.userForm.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));
        this.userForm.addControl('confirm_password', this.fb.control('', Validators.required));
        this.userForm.setValidators(passwordMatchValidator('newPassword', 'confirmPassword')); // Add custom validator
      }
    }

    // Patch user data if provided
    if (changes['user'] && this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };
      delete formValue.confirm_password; // Remove confirm_password before emitting
      this.save.emit(formValue);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

}
