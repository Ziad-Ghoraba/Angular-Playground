import { Component, EventEmitter, output, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import type {InvestmentInput} from ".././investment-input.model";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  // @Output() calculateInvestmentResults = new EventEmitter<InvestmentInput>();
  calculateInvestmentResults = output<InvestmentInput>();

  initialInvestment = '0';
  annualInvestment = '0';
  expectedReturn = '0';
  duration = '10';


  onSubmit() {
    console.log('Initial Investment:', this.initialInvestment);
    console.log('Annual Investment:', this.annualInvestment);
    console.log('Expected Return:', this.expectedReturn);
    console.log('Duration:', this.duration);
    this.calculateInvestmentResults.emit({
      initialInvestment: +this.initialInvestment,
      annualInvestment: +this.annualInvestment,
      expectedReturn: +this.expectedReturn,
      duration: +this.duration
    });
  }
}



