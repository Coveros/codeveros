import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Training } from '../training.interface';
import { TrainingService } from '../training.service';
import { TrainingDialogComponent } from '../training-dialog/training-dialog.component';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { CovTableSource } from '../../shared/cov-table-source';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';
import { TrainingDialogData } from '../training-dialog/training-dialog-data.interface';

@Component({
  templateUrl: './training-list.component.html',
  styleUrls: ['./training-list.component.scss'],
  imports: [
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
  ],
})
export class TrainingListComponent implements OnInit {
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private readonly matDialog = inject(MatDialog);
  private readonly trainingService = inject(TrainingService);
  private readonly matSnackBar = inject(MatSnackBar);
  cd = inject(ChangeDetectorRef);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['name', 'description', 'duration', 'type', 'actions'];
  loading = true;
  dataSource = new CovTableSource<Training>();

  typeOptions = {
    presentation: 'Presentation',
    workshop: 'Workshop',
    course: 'Course',
  };

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.trainingService.getAll().subscribe((training) => {
      this.dataSource.data = training;
      this.loading = false;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.matDialog.open(TrainingDialogComponent, {
      width: '750px',
      maxWidth: '95%',
    });

    dialogRef.afterClosed().subscribe((newTraining: Training) => {
      if (newTraining) {
        this.dataSource.data = [newTraining, ...this.dataSource.data];
        this.matSnackBar.open(
          `Training Course: ${newTraining.name} added to catalog`,
        );
      }
    });
  }

  editTraining(training: Training) {
    const dialogRef = this.matDialog.open<
      TrainingDialogComponent,
      TrainingDialogData
    >(TrainingDialogComponent, {
      width: '750px',
      maxWidth: '95%',
      data: { training },
    });

    dialogRef.afterClosed().subscribe((updated: Training) => {
      if (updated) {
        const index = this.dataSource.data.findIndex(
          (t) => t._id === updated._id,
        );
        if (index > -1) {
          const currTraining = [...this.dataSource.data];
          currTraining[index] = updated;
          this.dataSource.data = currTraining;
        }
        this.matSnackBar.open(`Training Course: ${updated.name} updated`);
      }
    });
  }

  deleteTraining(training: Training) {
    this.confirmDialogService
      .open({
        title: 'Remove Training?',
        message: `Are you sure you want to remove ${training.name} from the catalog?`,
        cancelId: 'cancel-training-delete',
        confirmId: 'confirm-training-delete',
        confirmText: 'Remove',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.trainingService
            .deleteTraining(training._id)
            .subscribe((deletedTraining) => {
              this.dataSource.data = this.dataSource.data.filter(
                (t: Training) => t._id !== deletedTraining._id,
              );
              this.matSnackBar.open(
                `Training ${deletedTraining.name} removed from catalog`,
              );
            });
        }
      });
  }
}
