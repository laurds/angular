import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports específicos do Angular Material Dialog
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  // Injetamos MatDialogRef para controlar o próprio diálogo (ex: fechar)
  // Injetamos MAT_DIALOG_DATA para receber dados do componente que abriu o diálogo
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { taskTitle: string }
  ) {}

  onCancel(): void {
    // Fecha o diálogo e não retorna nenhum valor
    this.dialogRef.close();
  }

  onConfirm(): void {
    // Fecha o diálogo e retorna 'true', indicando a confirmação
    this.dialogRef.close(true);
  }
}
