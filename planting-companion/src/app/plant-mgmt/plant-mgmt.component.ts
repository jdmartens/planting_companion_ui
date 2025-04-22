import { Component, OnInit } from '@angular/core';
import { PlantService, Plant } from '../core/plant.service';
import { PlantComponent } from '../plant/plant.component';

@Component({
  selector: 'app-plant-mgmt',
  templateUrl: './plant-mgmt.component.html',
  imports: [PlantComponent],
  styleUrl: './plant-mgmt.component.css'
})
export class PlantMgmtComponent implements OnInit {
  plants: Plant[] = [];
  loading: boolean = false;
  isDialogOpen: boolean = false;
  dialogData: { title: string; plant?: Plant } = { title: '' };

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

  deletePlant(plant: Plant): void {
    if (confirm(`Are you sure you want to delete the plant "${plant.name}"?`)) {
      this.plantService.deletePlant(plant.id!).subscribe({
        next: () => {
          console.log(`Plant "${plant.name}" deleted successfully.`);
          this.fetchPlants(); // Refresh the list of plants
        },
        error: (error) => {
          console.error(`Failed to delete plant "${plant.name}":`, error);
        }
      });
    }
  }
}
