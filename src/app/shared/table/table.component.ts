import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { BudgetItem } from 'src/app/budget/budget-creation/budget-creation.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() data: BudgetItem[] = [];

  public columns = ['name', 'value'];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource(
    this.data
  );

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  public getTotalValue(): number {
    return this.data.map((t) => t.value).reduce((acc, value) => acc + value, 0);
  }
}
