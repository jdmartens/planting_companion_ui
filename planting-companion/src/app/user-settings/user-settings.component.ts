import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-settings',
  imports: [],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent {
  activeTab: string = 'profile';
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
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

      console.log('Password updated:', { currentPassword, newPassword });
      // Add logic to call the backend API to update the password
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
