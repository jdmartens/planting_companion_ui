import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSettingsComponent } from './user-settings.component';
import { By } from '@angular/platform-browser';

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSettingsComponent], // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the active tab to "profile" by default', () => {
    expect(component.activeTab).toBe('profile');
  });

  it('should switch tabs when setActiveTab is called', () => {
    component.setActiveTab('appearance');
    expect(component.activeTab).toBe('appearance');

    component.setActiveTab('password');
    expect(component.activeTab).toBe('password');
  });

  it('should render the correct tab content based on activeTab', () => {
    component.activeTab = 'profile';
    fixture.detectChanges();
    const profileTabContent = fixture.debugElement.query(By.css('h2'));
    expect(profileTabContent.nativeElement.textContent).toContain('My Profile');

    component.setActiveTab('appearance');
    fixture.detectChanges();
    const appearanceTabContent = fixture.debugElement.query(By.css('p'));
    expect(appearanceTabContent.nativeElement.textContent).toContain('Customize the appearance of the application.');
  });

  it('should show the dialog when isDialogOpen is true', () => {
    component.isDialogOpen = true;
    fixture.detectChanges();
    const dialog = fixture.debugElement.query(By.css('.modal'));
    expect(dialog).toBeTruthy();
  });

  it('should hide the dialog when isDialogOpen is false', () => {
    component.isDialogOpen = false;
    fixture.detectChanges();
    const dialog = fixture.debugElement.query(By.css('.modal'));
    expect(dialog).toBeFalsy();
  });

  it('should show the toast when toasted is true', () => {
    component.toasted = true;
    fixture.detectChanges();
    const toast = fixture.debugElement.query(By.css('.toast'));
    expect(toast).toBeTruthy();
  });

  it('should hide the toast when toasted is false', () => {
    component.toasted = false;
    fixture.detectChanges();
    const toast = fixture.debugElement.query(By.css('.toast'));
    expect(toast).toBeFalsy();
  });

  it('should call editProfile when the Edit button is clicked', () => {
    spyOn(component, 'editProfile');
    component.activeTab = 'profile';
    component.userProfile = { email: 'test@example.com', full_name: 'Test User' };
    fixture.detectChanges();

    const editButton = fixture.debugElement.query(By.css('.btn-primary'));
    editButton.nativeElement.click();

    expect(component.editProfile).toHaveBeenCalled();
  });
});