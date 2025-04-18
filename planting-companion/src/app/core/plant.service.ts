import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Plant {
  id?: number; // Optional for new plants
  name: string;
  cultivar: string;
  quantity: number;
  date: string;
  location: string;
  notes: string;
  days_to_germ: number;
  days_to_maturity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  private readonly apiUrl = environment.apiUrl + '/plants/';

  constructor(private http: HttpClient) {}

  /**
   * Fetches a list of plants.
   * @returns An Observable containing the list of plants.
   */
  getPlants(): Observable<Plant[]> {
    return this.http.get<Plant[]>(this.apiUrl);
  }

  /**
   * Fetches a single plant by ID.
   * @param id The ID of the plant to fetch.
   * @returns An Observable containing the plant data.
   */
  getPlant(id: number): Observable<Plant> {
    return this.http.get<Plant>(`${this.apiUrl}${id}`);
  }

  /**
   * Creates a new plant.
   * @param plant The plant data to create.
   * @returns An Observable containing the created plant.
   */
  createPlant(plant: Plant): Observable<Plant> {
    return this.http.post<Plant>(this.apiUrl, plant);
  }

  /**
   * Updates an existing plant.
   * @param id The ID of the plant to update.
   * @param plant The updated plant data.
   * @returns An Observable containing the updated plant.
   */
  updatePlant(id: number, plant: Plant): Observable<Plant> {
    return this.http.put<Plant>(`${this.apiUrl}${id}`, plant);
  }

  /**
   * Deletes a plant by ID.
   * @param id The ID of the plant to delete.
   * @returns An Observable for the delete operation.
   */
  deletePlant(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}`);
  }

}
