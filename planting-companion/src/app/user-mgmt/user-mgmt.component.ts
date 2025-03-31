import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../core/user.service';
import { UserComponent } from '../user/user.component'; // Import UserComponent
import { ThemeService } from '../core/theme.service';

@Component({
  selector: 'app-user-mgmt',
  standalone: true,
  imports: [UserComponent], // Add UserComponent to imports
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.css']
})
export class UserMgmtComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;

  // Dialog state
  isDialogOpen = false;
  dialogData: { isEdit: boolean; user?: User } | null = null;

  constructor(private userService: UserService, public themeService: ThemeService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.data;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load users';
        console.error(error);
      }
    });
  }

  addUser(): void {
    this.dialogData = { isEdit: false };
    this.isDialogOpen = true;
  }

  editUser(user: User): void {
    this.dialogData = { isEdit: true, user };
    this.isDialogOpen = true;
  }

  closeDialog(result?: any): void {
    this.isDialogOpen = false;
    if (result) {
      if (this.dialogData?.isEdit) {
        console.log('User updated:', result);
        // Call API to update user and reload the list
      } else {
        console.log('User added:', result);
        // Call API to add user and reload the list
      }
    }
    this.dialogData = null;
  }

  deleteUser(userId: string): void {
    console.log(`Delete user with ID: ${userId}`);
    // Implement delete logic here
  }
}