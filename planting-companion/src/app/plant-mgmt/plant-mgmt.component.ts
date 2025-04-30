import { Component, OnInit } from '@angular/core';
import { PlantService, Plant } from '../core/plant.service';
import { PlantComponent } from '../plant/plant.component';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-plant-mgmt',
  templateUrl: './plant-mgmt.component.html',
  imports: [PlantComponent, CommonModule, ConfirmationDialogComponent],
  styleUrl: './plant-mgmt.component.css'
})
export class PlantMgmtComponent implements OnInit {
  plants: Plant[] = [];
  loading: boolean = false;
  isDialogOpen: boolean = false;
  isConfirmationDialogOpen: boolean = false;
  dialogData: { title: string; plant?: Plant } = { title: '' };
  confirmationData: { message: string; plant?: Plant } = { message: '' };

  // Toast state
  toastMessage: string = '';
  toastType: 'success' | 'error' = 'success'; // Add toastType to determine the style
  showToast: boolean = false;
  
  constructor(private plantService: PlantService) {}

  ngOnInit(): void {
    this.fetchPlants();
  }

  fetchPlants(): void {
    this.loading = true;
    this.plantService.getPlants().subscribe({
      next: (plants) => {
        this.plants = plants;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch plants:', error);
        this.loading = false;
      }
    });
  }

  openAddDialog(): void {
    this.dialogData = { title: 'Add Plant' };
    this.isDialogOpen = true;
  }

  openEditDialog(plant: Plant): void {
    this.dialogData = { title: 'Edit Plant', plant };
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  isLastRow(plants: Plant[], plant: Plant): boolean {
    return plants.indexOf(plant) === plants.length - 1;
  }

  savePlant(plant: Plant): void {
    if (plant.id) {
      // Update existing plant
      this.plantService.updatePlant(plant.id, plant).subscribe(() => {
        this.fetchPlants();
        this.closeDialog();
      });
    } else {
      // Add new plant
      this.plantService.createPlant(plant).subscribe(() => {
        this.fetchPlants();
        this.closeDialog();
      });
    }
  }

  openConfirmationDialog(plant: Plant): void {
    this.confirmationData = {
      message: `Are you sure you want to delete the plant "${plant.name}"?`,
      plant,
    };
    this.isConfirmationDialogOpen = true;
  }

  closeConfirmationDialog(): void {
    this.isConfirmationDialogOpen = false;
  }

  confirmDelete(): void {
    const plant = this.confirmationData.plant;
    if (plant) {
      this.plantService.deletePlant(plant.id!).subscribe({
        next: () => {
          this.showToastMessage(`Plant "${plant.name}" deleted successfully.`, 'success');
          console.log(`Plant "${plant.name}" deleted successfully.`);
          this.fetchPlants(); // Refresh the list of plants
          this.closeConfirmationDialog();
        },
        error: (error) => {
          this.showToastMessage(`Failed to delete plant "${plant.name}".`, 'error');
          console.error(`Failed to delete plant "${plant.name}":`, error);
          this.closeConfirmationDialog();
        },
      });
    }
  }

  showToastMessage(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}
