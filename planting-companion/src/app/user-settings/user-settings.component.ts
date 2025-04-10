import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../core/user.service';
import { passwordMatchValidator } from '../validators/password-match.validator';

@Component({
  selector: 'app-user-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  activeTab: string = 'profile';
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService,) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: passwordMatchValidator('newPassword', 'confirmPassword') }
    );
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  savePassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match.');
        return;
      }

      this.userService.resetPassword(currentPassword, newPassword).subscribe({
        next: () => {
          alert('Password updated successfully!');
        },
        error: (error) => {
          if (error.status === 404) {
            alert(error.error.message || 'Password reset failed. Please try again.');
          } else {
            alert('An unexpected error occurred. Please try again later.');
          }
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
