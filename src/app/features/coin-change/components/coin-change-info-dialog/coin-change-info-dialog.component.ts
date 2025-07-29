import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-coin-change-info-dialog',
  imports: [MatDialogTitle, MatDialogContent],
  templateUrl: './coin-change-info-dialog.component.html',
  styleUrl: './coin-change-info-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinChangeInfoDialogComponent {}
