import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../core/user.service';
import { UserComponent } from '../user/user.component'; // Import UserComponent
import { ThemeService } from '../core/theme.service';
import { TokenService } from '../core/token.service';

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
  dialogData: { title: string; user?: User } = { title: '' };

  constructor(
    private userService: UserService,
    public themeService: ThemeService,
    public tokenService: TokenService
  ) {}

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
    this.dialogData = { title: 'Add User' };
    this.isDialogOpen = true;
  }

  editUser(user: User): void {
    this.dialogData = { 'title': 'Edit User', 'user': user };
    this.isDialogOpen = true;
  }

  closeDialog(result?: any): void {
    this.isDialogOpen = false;
    if (result) {
      if (this.dialogData.title === 'Edit User' && this.dialogData.user) {
        console.log('User updated:', result);
        this.userService.patchUser(this.dialogData.user.id, result).subscribe({
          next: (updatedUser) => {
            console.log('User successfully updated:', updatedUser);
            this.loadUsers(); // Reload the user list after updating the user
          },
          error: (error) => {
            console.error('Failed to update user:', error);
          }
        });
      } 
      if (this.dialogData.title === 'Add User') {
        console.log('User added:', result);
        this.userService.createUser(result).subscribe({
          next: (newUser) => {
            console.log('User successfully created:', newUser);
            this.loadUsers(); 
          },
          error: (error) => {
            console.error('Failed to create user:', error);
          }
        });
      }
    }
    this.dialogData = {title: ''};
  }

  deleteUser(userId: string): void {
    const userToDelete = this.users.find(user => user.id === userId);
    const loggedInUserEmail = this.tokenService.getEmail();

    if (userToDelete?.email === loggedInUserEmail) {
      alert('You cannot delete your own account.');
      return;
    }

    console.log(`Delete user with ID: ${userId}`);
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(userId).subscribe({
        next: () => {
          console.log(`User with ID ${userId} successfully deleted.`);
          this.loadUsers(); // Reload the user list after deleting the user
        },
        error: (error) => {
          console.error(`Failed to delete user with ID ${userId}:`, error);
        }
      });
    }
  }
}