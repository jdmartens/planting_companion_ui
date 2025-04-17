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
}
