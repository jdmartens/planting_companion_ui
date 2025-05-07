import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlantService, Plant } from '../core/plant.service';

@Component({
  selector: 'app-plant-detail',
  imports: [],
  templateUrl: './plant-detail.component.html',
  styleUrl: './plant-detail.component.css'
})
export class PlantDetailComponent implements OnInit {
  plantService = inject(PlantService); // Inject PlantService
  route = inject(ActivatedRoute); // Inject ActivatedRoute

  plant: Plant | null = null; // Store the plant details
  loading: boolean = true; // Loading state

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
}
