import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatRipple } from '@angular/material/core';
import { MatIcon } from '@angular/material/icon';
import { CoinChangeInfoDialogComponent } from '../coin-change-info-dialog/coin-change-info-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-coin-change-info-button',
  imports: [MatIcon, MatIconButton, MatRipple],
  templateUrl: './coin-change-info-button.component.html',
  styleUrl: './coin-change-info-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinChangeInfoButtonComponent {
  constructor(private matDialog: MatDialog) {}

  public openInfoDialog(): void {
    this.matDialog.open(CoinChangeInfoDialogComponent);
  }
}
