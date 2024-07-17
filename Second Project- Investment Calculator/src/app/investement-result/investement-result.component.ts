import { Component, inject, Input } from '@angular/core';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investement-result',
  standalone: true,
  imports: [],
  templateUrl: './investement-result.component.html',
  styleUrl: './investement-result.component.css'
})
export class InvestementResultComponent {
  private investmentService = inject(InvestmentService)
  get results(){
    return this.investmentService.annualData
  }
}
