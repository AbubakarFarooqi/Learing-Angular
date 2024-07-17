import { Component } from '@angular/core';
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

  constructor(private investementService:InvestmentService){}
  initialInvestment = ''
  anualInvestment = ''
  exectedReturn = ''
  duration = ''

  calculate() {
    this.investementService.calculateInvestmentResults({
      initialAmount: +this.initialInvestment,
      anualAmount: +this.anualInvestment,
      expectedReturn: +this.exectedReturn,
      duration: +this.duration
    })
  }
}
