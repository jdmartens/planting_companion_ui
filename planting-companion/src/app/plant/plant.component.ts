import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plant } from '../core/plant.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-plant',
  imports: [FormsModule],
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css']
})
export class PlantComponent {
  @Input() title: string = '';
  @Input() plant: Plant = { name: '', cultivar: '', quantity: 0, date: '', location: '', notes: '', days_to_germ: 0, days_to_maturity: 0 };
  @Output() save = new EventEmitter<Plant>();
  @Output() cancel = new EventEmitter<void>();

  onSave(): void {
    this.save.emit(this.plant);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
