import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, UserResponse } from './user.service';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users from the API', () => {
    const mockResponse: UserResponse = {
      data: [
        {
          id: '1566651f-561d-4a8c-b1c9-e250fffc6c31',
          email: 'superuser@fake.com',
          full_name: 'supe user',
          is_active: true,
          is_superuser: true,
        },
        {
          id: 'f71bda3f-a170-4c0b-94dd-a066157c2ae1',
          email: 'mydude@fake.com',
          full_name: 'my dude',
          is_active: true,
          is_superuser: false,
        },
      ],
      count: 2,
    };

    service.getUsers().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      expect(response.data.length).toBe(2);
      expect(response.data[0].email).toBe('superuser@fake.com');
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the API response
  });

  it('should handle API errors gracefully', () => {
    const mockError = { status: 500, statusText: 'Internal Server Error' };

    service.getUsers().subscribe({
      next: () => fail('Expected an error, but got a response'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(null, mockError); // Simulate an error response
  });
});
