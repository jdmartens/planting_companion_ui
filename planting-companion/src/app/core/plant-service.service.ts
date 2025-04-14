import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Plant {
  id?: number; // Optional for new plants
  name: string;
  type: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private readonly BASE_URL = '/api/plants'; // Base URL for plant endpoints

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of plants.
   * @returns An Observable containing the list of plants.
   */
  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.BASE_URL);
  }

  /**
   * Fetches a single plant by ID.
   * @param id The ID of the plant to fetch.
   * @returns An Observable containing the plant data.
   */
  getPlant(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.BASE_URL}/${id}`);
  }

  /**
   * Creates a new plant.
   * @param plant The plant data to create.
   * @returns An Observable containing the created plant.
   */
  createPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(this.BASE_URL, plant);
  }

  /**
   * Updates an existing plant.
   * @param id The ID of the plant to update.
   * @param plant The updated plant data.
   * @returns An Observable containing the updated plant.
   */
  updatePlant(id: number, plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.BASE_URL}/${id}`, plant);
  }

  /**
   * Deletes a plant by ID.
   * @param id The ID of the plant to delete.
   * @returns An Observable for the delete operation.
   */
  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }

}
