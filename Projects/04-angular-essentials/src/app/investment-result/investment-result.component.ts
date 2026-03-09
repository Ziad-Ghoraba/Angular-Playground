import { Component, Input, input } from '@angular/core';
import type { InvestmentOutput } from '../investment-output.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-investment-result',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-result.component.html',
  styleUrl: './investment-result.component.css'
})

export class InvestmentResultComponent {
@Input() results?: InvestmentOutput[];
// results = input<InvestmentOutput[]>();
}
