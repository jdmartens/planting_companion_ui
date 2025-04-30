import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Plant } from '../core/plant.service';

@Component({
  selector: 'app-plant',
  imports: [ReactiveFormsModule],
  templateUrl: './plant.component.html',
  styleUrls: ['./plant.component.css'],
  standalone: true,
})
export class PlantComponent implements OnChanges {
  @Input() title: string = '';
  @Input() plant: Plant | null = null;
  @Output() save = new EventEmitter<Plant>();
  @Output() cancel = new EventEmitter<void>();

  plantForm: FormGroup;

  constructor(private fb: FormBuilder) {
    // Initialize the form
    this.plantForm = this.fb.group({
      name: ['', Validators.required],
      cultivar: ['', Validators.required],
      quantity: [0, [Validators.required, Validators.min(1)]],
      date: [''],
      location: [''],
      notes: [''],
      days_to_germ: [0, Validators.min(0)],
      days_to_maturity: [0, Validators.min(0)],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Patch plant data if provided
    if (changes['plant'] && this.plant) {
      this.plantForm.patchValue(this.plant);
    }
  }

  onSave(): void {
    if (this.plantForm.valid) {
      const formValue = { ...this.plantForm.value };
      this.save.emit(formValue as Plant);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
