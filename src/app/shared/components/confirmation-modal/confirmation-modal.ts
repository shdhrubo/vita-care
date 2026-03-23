import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmationData {
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmColor?: 'red' | 'indigo' | 'orange' | 'green';
}

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './confirmation-modal.html',
  styleUrl: './confirmation-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationModalComponent {
  public data: ConfirmationData = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<ConfirmationModalComponent>);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  getConfirmBtnClass(): string {
    const color = this.data.confirmColor || 'indigo';
    
    switch (color) {
      case 'red':
        return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
      case 'green':
        return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
      case 'orange':
        return 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500';
      case 'indigo':
      default:
        return 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500';
    }
  }

}
