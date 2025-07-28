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

  public readonly coinForm = this.fb.group({
    amount: ['', [CustomValidators.noWhiteSpace]],
    denominations: [
      '',
      [Validators.required, Validators.pattern(/^(\d+)(,\d+)*$/)],
    ],
  }) as FormGroup;

  constructor(
    private fb: FormBuilder,
    private coinChangeService: CoinChangeService,
  ) {}

  public submit(): void {
    if (this.coinForm.invalid) return;

    const amount = this.coinForm.value.amount;
    const denominationsInput = this.coinForm.value.denominations;
    const coins = this.parseDenominations(denominationsInput);

    if (!coins.length) {
      alert('Please enter valid coin denominations.');
      return;
    }

    this.result = this.coinChangeService.calculateGreedy(amount, coins);
  }

  public generateRandomExample(): void {
    const randomAmount = Math.floor(Math.random() * 91) + 10;
    const presetDenominations = [
      [1, 5, 10, 25],
      [1, 2, 5],
      [1, 3, 4],
      [1, 7, 10],
    ];

    const randomSet =
      presetDenominations[
        Math.floor(Math.random() * presetDenominations.length)
      ];

    this.coinForm.setValue({
      amount: randomAmount,
      denominations: randomSet.join(','),
    });

    this.submit();
  }

  private parseDenominations(input: string): number[] {
    return input
      .split(',')
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0)
      .sort((a, b) => b - a);
  }
}
