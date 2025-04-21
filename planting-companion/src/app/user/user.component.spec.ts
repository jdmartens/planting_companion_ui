import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { By } from '@angular/platform-browser';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent], // Standalone component
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title passed as an input', () => {
    component.title = 'Test Title';
    fixture.detectChanges();

    const titleElement = fixture.debugElement.query(By.css('h1'));
    expect(titleElement.nativeElement.textContent).toContain('Test Title');
  });

  it('should emit the save event when save is called', () => {
    spyOn(component.save, 'emit');
    component.user = { id: 1, name: 'Test User' };
    component.onSave(); 
    expect(component.save.emit).toHaveBeenCalledWith(component.user); // Ensure the user is emitted
  });

  it('should emit the cancel event when cancel is called', () => {
    spyOn(component.cancel, 'emit');

    component.onCancel();

    expect(component.cancel.emit).toHaveBeenCalled();
  });

  it('should render user details when user input is provided', () => {
    component.user = { id: 1, name: 'Test User', email: 'test@example.com' };
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('.user-name'));
    const emailElement = fixture.debugElement.query(By.css('.user-email'));

    expect(nameElement.nativeElement.textContent).toContain('Test User');
    expect(emailElement.nativeElement.textContent).toContain('test@example.com');
  });

    it('should emit the cancel event when cancel is called', () => {
    spyOn(component.cancel, 'emit');
  
    component.onCancel(); // Call onCancel without arguments
  
    expect(component.cancel.emit).toHaveBeenCalled(); // Ensure the cancel event is emitted
  });

  it('should call onCancel when the Cancel button is clicked', () => {
    spyOn(component, 'onCancel');
    fixture.detectChanges();

    const cancelButton = fixture.debugElement.query(By.css('.btn-cancel'));
    cancelButton.nativeElement.click();

    expect(component.onCancel).toHaveBeenCalled();
  });
});
