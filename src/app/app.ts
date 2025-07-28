import { Component } from '@angular/core';
import { CoinChangeComponent } from './features/coin-change/coin-change.component';

@Component({
  selector: 'app-root',
  imports: [CoinChangeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
