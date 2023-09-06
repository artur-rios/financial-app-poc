import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';

import { MatTableModule } from '@angular/material/table';
import { ResultsTableComponent } from './results-table/results-table.component';

@NgModule({
  declarations: [TableComponent, ResultsTableComponent],
  imports: [CommonModule, MatTableModule],
  exports: [TableComponent, ResultsTableComponent],
})
export class SharedModule {}
