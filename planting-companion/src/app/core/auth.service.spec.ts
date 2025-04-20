import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockLoginResponse = {
    access_token: 'mockAccessToken',
    refresh_token: 'mockRefreshToken',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClientTesting(), // Use the new provideHttpClientTesting
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log in a user', () => {
    const email = 'test@example.com';
    const password = 'password123';
  
    service.login(email, password).subscribe((response) => {
      expect(response).toEqual(mockLoginResponse);
    });
  
    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password }); // Ensure the payload matches
    req.flush(mockLoginResponse); // Mock the backend response
  });

  it('should log out a user', () => {
    const removeTokenSpy = spyOn(service['tokenService'], 'removeToken').and.callThrough();
    const navigateSpy = spyOn(service['router'], 'navigate');
  
    service.logout();
  
    expect(removeTokenSpy).toHaveBeenCalled(); // Ensure the token is removed
    expect(navigateSpy).toHaveBeenCalledWith(['/login'], {
      queryParams: { sessionExpired: true },
      replaceUrl: true,
    }); // Ensure navigation to the login page
  });
});
