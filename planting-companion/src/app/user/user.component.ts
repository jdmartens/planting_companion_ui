import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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

  userForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      is_active: [true],
      is_superuser: [false]
    });
  }

  ngOnChanges(): void {
    if (this.user) {
      this.userForm.patchValue(this.user);
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.save.emit(this.userForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}