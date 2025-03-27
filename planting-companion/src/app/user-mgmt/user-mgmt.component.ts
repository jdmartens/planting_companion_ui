import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../core/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent, UserDialogData } from '../user/user.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
  styleUrls: ['./user-mgmt.component.css'],
  imports: [MatTableModule]
})
export class UserMgmtComponent implements OnInit {
  users: User[] = [];
  errorMessage: string | null = null;

  constructor(
    private userService: UserService, 
    private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(UserComponent, {
      width: '400px',
      data: { isEdit: false } as UserDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User added:', result);
        // Call API to add user and reload the list
      }
    });
  }

  editUser(user: any): void {
    const dialogRef = this.dialog.open(UserComponent, {
      width: '400px',
      data: { isEdit: true, user } as UserDialogData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User updated:', result);
        // Call API to update user and reload the list
      }
    });
  }

  deleteUser(userId: string): void {
    console.log(`Delete user with ID: ${userId}`);
    // Implement delete logic here
  }
}
