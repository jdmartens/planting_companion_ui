import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';

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
  encapsulation: ViewEncapsulation.None 
})
export class UserComponent {
  @Input() title: string = 'Add User';
  @Input() user: any | null = null;
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  isAdd: boolean = false;
  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.isAdd = this.title.toLowerCase().includes('add');
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      is_active: [true],
      is_superuser: [false]
    });

    // Add password fields only if not in Edit mode
    if (this.isAdd) {
      this.userForm.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));
      this.userForm.addControl('confirm_password', this.fb.control('', Validators.required));
      this.userForm.setValidators(this.passwordsMatchValidator); // Add custom validator
    }
  }

  ngOnChanges(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      const formValue = { ...this.userForm.value };
      delete formValue.confirm_password;
      this.save.emit(formValue);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }

  private passwordsMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirm_password')?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  }
}