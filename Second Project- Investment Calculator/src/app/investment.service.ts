import { Injectable } from "@angular/core";
import {type InvestmentInput } from "./investment-input.model";

@Injectable({providedIn: 'root'})

export class InvestmentService{

    annualData?:{year: number,
        interest: number,
        valueEndOfYear: number,
        annualInvestment: number,
        totalInterest: number,
        totalAmountInvested: number}[]
    calculateInvestmentResults(data:InvestmentInput) {
      console.log("Azan")
        const annualData = [];
        let investmentValue = data.initialAmount;
      
        for (let i = 0; i < data.duration; i++) {
          const year = i + 1;
          const interestEarnedInYear = investmentValue * (data.expectedReturn / 100);
          investmentValue += interestEarnedInYear + data.anualAmount;
          const totalInterest =
            investmentValue - data.anualAmount * year - data.initialAmount;
          annualData.push({
            year: year,
            interest: interestEarnedInYear,
            valueEndOfYear: investmentValue,
            annualInvestment: data.anualAmount,
            totalInterest: totalInterest,
            totalAmountInvested: data.initialAmount + data.anualAmount * year,
          });
        }
        this.annualData = annualData
        // return annualData;
      }
}
