import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PlantService, Plant } from '../core/plant.service';
import { PlantComponent } from '../plant/plant.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plant-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, PlantComponent], // Import PlantComponent
  templateUrl: './plant-detail.component.html',
  styleUrl: './plant-detail.component.css'
})
export class PlantDetailComponent implements OnInit {
  plantService = inject(PlantService); // Inject PlantService
  route = inject(ActivatedRoute); // Inject ActivatedRoute

  plant: Plant | null = null; // Store the plant details
  loading: boolean = true; // Loading state
  isDialogOpen: boolean = false; // Track dialog state
  dialogData: { title: string; plant: Plant | null } = { title: '', plant: null };

  ngOnInit(): void {
    // Get the UID from the route and fetch the plant details
    const uid = this.route.snapshot.paramMap.get('uid');
    if (uid) {
      this.fetchPlant(uid);
    }
  }

  fetchPlant(uid: string): void {
    this.loading = true;
    this.plantService.getPlant(uid).subscribe({
      next: (plant) => {
        this.plant = plant;
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to fetch plant details:', error);
        this.loading = false;
      }
    });
  }

  openEditDialog(): void {
    if (this.plant) {
      this.dialogData = { title: 'Edit Plant', plant: this.plant };
      this.isDialogOpen = true;
    }
  }

  closeDialog(result?: Plant): void {
    this.isDialogOpen = false;
    if (result) {
      this.plantService.updatePlant(result.id!, result).subscribe({
        next: (updatedPlant) => {
          this.plant = updatedPlant; // Update the plant details
          console.log('Plant successfully updated:', updatedPlant);
        },
        error: (error) => {
          console.error('Failed to update plant:', error);
        }
      });
    }
  }
}
