import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CoinChangeResult } from '../../models/coin-change';

@Component({
  selector: 'app-coin-change-result',
  imports: [],
  templateUrl: './coin-change-result.component.html',
  styleUrl: './coin-change-result.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoinChangeResultComponent {
  @Input({ required: true }) result!: CoinChangeResult;
}
