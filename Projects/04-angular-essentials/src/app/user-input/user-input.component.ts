import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  // @Output() calculateInvestmentResults = new EventEmitter<InvestmentInput>();
  // calculateInvestmentResults = output<InvestmentInput>();

  constructor(private investmentService: InvestmentService) {

  }

  initialInvestment = '0';
  annualInvestment = '0';
  expectedReturn = '0';
  duration = '10';


  onSubmit() {
    console.log('Initial Investment:', this.initialInvestment);
    console.log('Annual Investment:', this.annualInvestment);
    console.log('Expected Return:', this.expectedReturn);
    console.log('Duration:', this.duration);
    this.investmentService.calculateInvestmentResults({
      initialInvestment: +this.initialInvestment,
      annualInvestment: +this.annualInvestment,
      expectedReturn: +this.expectedReturn,
      duration: +this.duration
    });
    this.initialInvestment = '0';
    this.annualInvestment = '0';
    this.expectedReturn = '0';
    this.duration = '10';
  }
}



