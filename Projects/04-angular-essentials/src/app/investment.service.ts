import { Injectable, signal } from '@angular/core';
import { InvestmentInput } from './investment-input.model';
import { InvestmentOutput } from './investment-output.model';

@Injectable({
  providedIn: 'root'
})

export class InvestmentService {
  results =  signal<InvestmentOutput[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
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
  this.results.set(annualData);
}
}


