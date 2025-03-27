import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { UserMgmtComponent } from './user-mgmt.component';
import { UserService } from '../core/user.service';

describe('UserMgmtComponent', () => {
  let component: UserMgmtComponent;
  let fixture: ComponentFixture<UserMgmtComponent>;
  let userService: jasmine.SpyObj<UserService>;

  const mockUsers = [
    {
      id: '1',
      email: 'user1@example.com',
      full_name: 'User One',
      is_active: true,
      is_superuser: false,
    },
    {
      id: '2',
      email: 'admin@example.com',
      full_name: 'Admin User',
      is_active: true,
      is_superuser: true,
    },
  ];

  beforeEach(async () => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [UserMgmtComponent],
      providers: [{ provide: UserService, useValue: userServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserMgmtComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on initialization', () => {
    userService.getUsers.and.returnValue(of({ data: mockUsers, count: 2 }));

    component.ngOnInit();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.errorMessage).toBeNull();
  });

  it('should handle errors when loading users', () => {
    userService.getUsers.and.returnValue(throwError(() => new Error('Failed to load users')));

    component.ngOnInit();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual([]);
    expect(component.errorMessage).toBe('Failed to load users');
  });

  it('should call editUser when edit button is clicked', () => {
    spyOn(component, 'editUser');
    component.users = mockUsers;
    fixture.detectChanges();

    const editButton = fixture.nativeElement.querySelector('button.edit-user');
    editButton.click();

    expect(component.editUser).toHaveBeenCalledWith('1'); // Assuming the first user's ID is '1'
  });

  it('should call deleteUser when delete button is clicked', () => {
    spyOn(component, 'deleteUser');
    component.users = mockUsers;
    fixture.detectChanges();

    const deleteButton = fixture.nativeElement.querySelector('button.delete-user');
    deleteButton.click();

    expect(component.deleteUser).toHaveBeenCalledWith('1'); // Assuming the first user's ID is '1'
  });

  it('should display "No users found" when the user list is empty', () => {
    component.users = [];
    fixture.detectChanges();

    const noUsersMessage = fixture.nativeElement.querySelector('.no-users');
    expect(noUsersMessage).toBeTruthy();
    expect(noUsersMessage.textContent).toContain('No users found.');
  });
});
