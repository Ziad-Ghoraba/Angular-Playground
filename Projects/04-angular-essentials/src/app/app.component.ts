import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { UserInputComponent } from "./user-input/user-input.component";
import type { InvestmentInput } from './investment-input.model';
import { InvestmentResultComponent } from "./investment-result/investment-result.component";
import { InvestmentOutput } from './investment-output.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [HeaderComponent, UserInputComponent, InvestmentResultComponent],
})
export class AppComponent {
  results?: InvestmentOutput[];
  onCalculateInvestmentResults(data: InvestmentInput) {
  const annualData = [];
  let investmentValue = data.initialInvestment;

  for (let i = 0; i < data.duration; i++) {
    const year = i + 1;
    const interestEarnedInYear = investmentValue * (data.expectedReturn / 100);
    investmentValue += interestEarnedInYear + data.annualInvestment;
    const totalInterest =
      investmentValue - data.annualInvestment * year - data.initialInvestment;
    annualData.push({
      year: year,
      interest: interestEarnedInYear,
      valueEndOfYear: investmentValue,
      annualInvestment: data.annualInvestment,
      totalInterest: totalInterest,
      totalAmountInvested: data.initialInvestment + data.annualInvestment * year,
    });
  }
  console.log(annualData);
  this.results = annualData;
}

}
