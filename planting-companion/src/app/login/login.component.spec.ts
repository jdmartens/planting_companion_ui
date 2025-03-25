import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AuthService } from '../core/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: HttpClient, useValue: {} }, // Mock HttpClient if needed
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when email and password are provided', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should have an invalid form when email or password is missing', () => {
    component.loginForm.setValue({ email: '', password: '' });
    expect(component.loginForm.valid).toBeFalse();
  });

  it('should call AuthService.login on form submit with valid credentials', () => {
    const loginResponse = { access_token: 'test-token' };
    authService.login.and.returnValue(of(loginResponse));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('should handle login success and navigate to dashboard', () => {
    const loginResponse = { access_token: 'test-token' };
    authService.login.and.returnValue(of(loginResponse));

    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();

    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should handle login failure and set error message', () => {
    const errorResponse = { error: { detail: 'Invalid credentials' } };
    authService.login.and.returnValue(throwError(() => errorResponse));

    component.loginForm.setValue({ email: 'test@example.com', password: 'wrongpassword' });
    component.onSubmit();

    expect(component.errorMessage).toBe('Invalid credentials');
  });

  it('should disable the submit button when the form is invalid', () => {
    component.loginForm.setValue({ email: '', password: '' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeTrue();
  });

  it('should enable the submit button when the form is valid', () => {
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    fixture.detectChanges();

    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(submitButton.disabled).toBeFalse();
  });

  it('should clear the error message on successful login', () => {
    const loginResponse = { access_token: 'test-token' };
    authService.login.and.returnValue(of(loginResponse));

    component.errorMessage = 'Some error';
    component.loginForm.setValue({ email: 'test@example.com', password: 'password123' });
    component.onSubmit();

    expect(component.errorMessage).toBe('');
  });
});