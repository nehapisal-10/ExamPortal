import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confim-dialog',
  templateUrl: './confim-dialog.component.html',
  styleUrl: './confim-dialog.component.css'
})
export class ConfimDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfimDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true); // Confirm action
  }

  onCancel(): void {
    this.dialogRef.close(false); // Cancel action
  }
}
