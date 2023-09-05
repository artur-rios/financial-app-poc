import { Component, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  @Input() data: Array<any> = [];

  public columns = ['name', 'value'];

  public dataSource: MatTableDataSource<any> = new MatTableDataSource(
    this.data
  );

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data);

    //! TEST
    console.log('Table data:', this.data);
  }

  public getTotalValue() {
    return this.data.map((t) => t.value).reduce((acc, value) => acc + value, 0);
  }
}
