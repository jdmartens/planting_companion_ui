import { Component, OnInit } from '@angular/core';
import { PlantService, Plant } from '../core/plant.service';

@Component({
  selector: 'app-plant-mgmt',
  templateUrl: './plant-mgmt.component.html',
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

  editPlant(plant: Plant): void {
    // Logic to edit the plant
    console.log('Editing plant:', plant);
  }
  deletePlant(plant: Plant): void {
    // Logic to delete the plant
    console.log('Deleting plant:', plant);
  }
}
