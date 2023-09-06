import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Budget } from 'src/app/budget/budget-creation/budget-creation.component';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements OnChanges {
  @Input() public data: Budget = { availableBudget: 0, items: [] };

  public budgetResults: BudgetResults[] = [];

  public columns = ['availableBudget', 'totalExpenses', 'finalBudget'];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource(
    this.budgetResults
  );

  ngOnChanges(): void {
    this.updateResults();
    this.dataSource = new MatTableDataSource(this.budgetResults);
  }

  public getTotalValue(): number {
    return this.data.items
      .map((t) => t.value)
      .reduce((acc, value) => acc + value, 0);
  }

  public getBudgetResult(): number {
    return this.data.availableBudget - this.getTotalValue();
  }

  private updateResults(): void {
    this.budgetResults = [
      {
        availableBudget: this.data.availableBudget,
        totalExpenses: this.getTotalValue(),
        finalBudget: this.data.availableBudget - this.getTotalValue(),
      },
    ];
  }
}

export interface BudgetResults {
  availableBudget: number;
  totalExpenses: number;
  finalBudget: number;
}
