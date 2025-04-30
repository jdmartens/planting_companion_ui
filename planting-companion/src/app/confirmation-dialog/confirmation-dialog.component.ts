import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css'],
  standalone: true,
})
export class ConfirmationDialogComponent {
  @Input() message: string = 'Are you sure?'; // Confirmation message
  @Input() deleteButtonText: string = 'Delete'; // Optional delete button text
  @Output() confirm = new EventEmitter<void>(); // Emit when confirmed
  @Output() cancel = new EventEmitter<void>(); // Emit when canceled

  onConfirm(): void {
    this.confirm.emit();
  }

  onCancel(): void {
    this.cancel.emit();
  }
}