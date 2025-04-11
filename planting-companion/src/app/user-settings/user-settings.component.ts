import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CurrentUserService } from '../core/current-user.service';
import { passwordMatchValidator } from '../validators/password-match.validator';
import { User } from '../core/user.service';
import { ThemeService } from '../core/theme.service';
import { UserComponent } from '../user/user.component'

@Component({
  selector: 'app-user-settings',
  imports: [ReactiveFormsModule, UserComponent],
  templateUrl: './user-settings.component.html',
  styleUrl: './user-settings.component.css'
})
export class UserSettingsComponent implements OnInit {
  activeTab: string = 'profile';
  passwordForm: FormGroup;
  userProfile: any = null; 
  loading: boolean = false;

  // Dialog state
    isDialogOpen = false;
    dialogData: { title: string; user?: User } = { title: '' };

  constructor(
    private fb: FormBuilder,
    private userService: CurrentUserService,
    public themeService: ThemeService,
  ) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: passwordMatchValidator('newPassword', 'confirmPassword') }
    );
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  fetchUserProfile(): void {
    this.loading = true;
    this.userService.getMe().subscribe({
      next: (user) => {
        this.userProfile = user;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch user profile:', error);
        this.loading = false;
      }
    });
  }

  editProfile(): void {
    this.dialogData = { 'title': 'Edit User', 'user': this.userProfile };
    this.isDialogOpen = true;
  }

  closeDialog(result?: any): void {
    console.log('Dialog closed with result:', result);
  }

  savePassword(): void {
    if (this.passwordForm.valid) {
      const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

      this.userService.updateMyPassword(currentPassword, newPassword).subscribe({
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
