import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CurrentUserService } from './current-user.service';

describe('CurrentUserService', () => {
  let service: CurrentUserService;
  let httpMock: HttpTestingController;

  const mockUser = {
    id: 1,
    email: 'test@example.com',
    full_name: 'Test User',
    is_active: true,
    is_superuser: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentUserService,
        provideHttpClientTesting(), // Use the new provideHttpClientTesting
      ],
    });
    service = TestBed.inject(CurrentUserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the current user', () => {
    service.getMe().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('/api/me');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser); // Mock the backend response
  });

  it('should update the user password', () => {
    const passwordPayload = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
    };

    service.updateMyPassword(passwordPayload.currentPassword, passwordPayload.newPassword).subscribe((response) => {
      expect(response).toBeUndefined(); // No content expected
    });

    const req = httpMock.expectOne('/api/me/password');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(passwordPayload);
    req.flush(null); // Mock the backend response
  });

  it('should update the user information', () => {
    const updatedUser = {
      email: 'updated@example.com',
      full_name: 'Updated User',
    };

    service.updateMe(updatedUser).subscribe((user) => {
      expect(user).toEqual({ ...mockUser, ...updatedUser });
    });

    const req = httpMock.expectOne('/api/me');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(updatedUser);
    req.flush({ ...mockUser, ...updatedUser }); // Mock the backend response
  });

  it('should delete the current user', () => {
    service.deleteMe().subscribe((response) => {
      expect(response).toBeUndefined(); // No content expected
    });

    const req = httpMock.expectOne('/api/me');
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // Mock the backend response
  });
});