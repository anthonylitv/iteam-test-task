import { Component } from '@angular/core';
import { CoinChangeService } from './services/coin-change.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { CoinChangeResult } from './models/coin-change';
import { CustomValidators } from '../../shared/validators/custom-validators';
import { CommonModule } from '@angular/common';
import {
  getRandomCoinPreset,
  parseCoinDenominations,
} from './helpers/coin-change.helpers';

@Component({
  selector: 'app-coin-change',
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatFormField,
    MatButton,
    MatListItem,
    MatList,
    MatLabel,
    MatError,
  ],
  templateUrl: './coin-change.component.html',
  styleUrl: './coin-change.component.scss',
  providers: [CoinChangeService],
})
export class CoinChangeComponent {
  public result: CoinChangeResult | null = null;

  public readonly coinForm = this.formBuilder.group({
    amount: [
      null,
      [
        CustomValidators.noWhiteSpace,
        Validators.pattern(/^\d+$/),
        Validators.min(1),
      ],
    ],
    denominations: [
      '',
      [CustomValidators.noWhiteSpace, Validators.pattern(/^(\d+)(,\d+)*$/)],
    ],
  }) as FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private coinChangeService: CoinChangeService,
  ) {}

  public submit(): void {
    if (this.coinForm.invalid) return;

    const amount = this.coinForm.value.amount;
    const denominationsInput = this.coinForm.value.denominations;
    const coins = parseCoinDenominations(denominationsInput);

    this.result = this.coinChangeService.calculateGreedy(amount, coins);

    if (this.result.totalCoins === 0) {
      alert('Неможливо підібрати комбінацію монет для цієї суми.');
      this.result = null;
    }
  }

  public generateRandomExample(): void {
    const randomAmount = Math.floor(Math.random() * 91) + 10;

    this.coinForm.setValue({
      amount: randomAmount,
      denominations: getRandomCoinPreset().join(','),
    });

    this.submit();
  }
}
