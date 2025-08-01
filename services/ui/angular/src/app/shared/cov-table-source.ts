import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export class CovTableSource<T> extends MatTableDataSource<T> {
  private readonly collator = new Intl.Collator(undefined, { sensitivity: 'accent' });

  sortData = function (data: T[], sort: MatSort): T[] {
    const active = sort.active;
    const direction = sort.direction;
    if (!active || direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const valueA = this.sortingDataAccessor(a, active);
      const valueB = this.sortingDataAccessor(b, active);
      let comparatorResult = 0;
      if (valueA !== null && valueB !== null) {
        if (typeof valueA === 'string' && typeof valueB === 'string') {
          comparatorResult = this.collator.compare(valueA, valueB);
        } else if (valueA > valueB) {
          comparatorResult = 1;
        } else if (valueA < valueB) {
          comparatorResult = -1;
        }
      } else if (valueA !== null) {
        comparatorResult = 1;
      } else if (valueB !== null) {
        comparatorResult = -1;
      }
      return comparatorResult * (direction === 'asc' ? 1 : -1);
    });
  };
}
