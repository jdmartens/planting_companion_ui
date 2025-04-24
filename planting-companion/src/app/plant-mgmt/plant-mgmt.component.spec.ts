import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { PlantMgmtComponent } from './plant-mgmt.component';
import { PlantService } from '../core/plant.service';

describe('PlantMgmtComponent', () => {
  let component: PlantMgmtComponent;
  let fixture: ComponentFixture<PlantMgmtComponent>;
  let mockPlantService: jasmine.SpyObj<PlantService>;

  const mockPlants = [
    { id: 1, name: 'Tomato', cultivar: 'Cherry', quantity: 10 },
    { id: 2, name: 'Carrot', cultivar: 'Nantes', quantity: 20 },
  ];

  beforeEach(async () => {
    mockPlantService = jasmine.createSpyObj('PlantService', ['getPlants', 'createPlant', 'updatePlant', 'deletePlant']);

    await TestBed.configureTestingModule({
      imports: [PlantMgmtComponent],
      providers: [{ provide: PlantService, useValue: mockPlantService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantMgmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch plants on initialization', () => {
    mockPlantService.getPlants.and.returnValue(of(mockPlants));

    component.fetchPlants();

    expect(mockPlantService.getPlants).toHaveBeenCalled();
    expect(component.plants).toEqual(mockPlants);
    expect(component.loading).toBeFalse();
  });

  it('should handle errors when fetching plants', () => {
    mockPlantService.getPlants.and.returnValue(throwError(() => new Error('Failed to fetch plants')));

    component.fetchPlants();

    expect(mockPlantService.getPlants).toHaveBeenCalled();
    expect(component.plants).toEqual([]);
    expect(component.loading).toBeFalse();
  });

  it('should open the add dialog', () => {
    component.openAddDialog();

    expect(component.dialogData).toEqual({ title: 'Add Plant' });
    expect(component.isDialogOpen).toBeTrue();
  });

  it('should open the edit dialog', () => {
    const plant = mockPlants[0];
    component.openEditDialog(plant);

    expect(component.dialogData).toEqual({ title: 'Edit Plant', plant });
    expect(component.isDialogOpen).toBeTrue();
  });

  it('should close the dialog', () => {
    component.isDialogOpen = true;

    component.closeDialog();

    expect(component.isDialogOpen).toBeFalse();
  });

  it('should save a new plant', () => {
    const newPlant = { name: 'Lettuce', cultivar: 'Romaine', quantity: 15 };
    mockPlantService.createPlant.and.returnValue(of(newPlant));

    component.savePlant(newPlant);

    expect(mockPlantService.createPlant).toHaveBeenCalledWith(newPlant);
    expect(mockPlantService.getPlants).toHaveBeenCalled();
    expect(component.isDialogOpen).toBeFalse();
  });

  it('should update an existing plant', () => {
    const updatedPlant = { id: 1, name: 'Tomato', cultivar: 'Cherry', quantity: 12 };
    mockPlantService.updatePlant.and.returnValue(of(updatedPlant));

    component.savePlant(updatedPlant);

    expect(mockPlantService.updatePlant).toHaveBeenCalledWith(updatedPlant.id, updatedPlant);
    expect(mockPlantService.getPlants).toHaveBeenCalled();
    expect(component.isDialogOpen).toBeFalse();
  });

  it('should delete a plant', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simulate user confirming the deletion
    const plantToDelete = mockPlants[0];
    mockPlantService.deletePlant.and.returnValue(of(undefined));

    component.deletePlant(plantToDelete);

    expect(mockPlantService.deletePlant).toHaveBeenCalledWith(plantToDelete.id);
    expect(mockPlantService.getPlants).toHaveBeenCalled();
  });

  it('should not delete a plant if user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false); // Simulate user canceling the deletion
    const plantToDelete = mockPlants[0];

    component.deletePlant(plantToDelete);

    expect(mockPlantService.deletePlant).not.toHaveBeenCalled();
  });
});
