import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantMgmtComponent } from './plant-mgmt.component';

describe('PlantMgmtComponent', () => {
  let component: PlantMgmtComponent;
  let fixture: ComponentFixture<PlantMgmtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantMgmtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
