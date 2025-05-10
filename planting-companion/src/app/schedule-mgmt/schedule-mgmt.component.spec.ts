import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMgmtComponent } from './schedule-mgmt.component';

describe('ScheduleMgmtComponent', () => {
  let component: ScheduleMgmtComponent;
  let fixture: ComponentFixture<ScheduleMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleMgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
