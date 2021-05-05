import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {Training} from '../training.interface';
import {TrainingService} from '../training.service';
import {TrainingDialogComponent} from '../training-dialog/training-dialog.component';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { CovTableSource } from '../../shared/cov-table-source';
import { MatSort } from '@angular/material/sort';


@Component({
  templateUrl: './training-list.component.html',
  styleUrls: [ './training-list.component.scss' ]
})
export class TrainingListComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns = [ 'name', 'description', 'duration', 'type', 'actions' ];
  loading = true;
  dataSource = new CovTableSource<Training>();

  typeOptions = {
    presentation: 'Presentation',
    workshop: 'Workshop',
    course: 'Course'
  };

  constructor(
    private confirmDialogService: ConfirmDialogService,
    private matDialog: MatDialog,
    private trainingService: TrainingService,
    private matSnackBar: MatSnackBar,
    public cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.trainingService.getAll()
      .subscribe(training => {
        this.dataSource.data = training;
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
  }

  openAddDialog(): void {
    const dialogRef = this.matDialog.open(TrainingDialogComponent, {
      width: '750px',
      maxWidth: '95%',
      data: {}
    });

    dialogRef.afterClosed().subscribe((newTraining: Training) => {
      if (newTraining) {
        this.dataSource.data = [newTraining, ...this.dataSource.data];
        this.matSnackBar.open(`Training Course: ${newTraining.name} added to catalog`);
      }
    });
  }

  editTraining(training: Training) {
    const dialogRef = this.matDialog.open(TrainingDialogComponent, {
      width: '750px',
      maxWidth: '95%',
      data: { training }
    });

    dialogRef.afterClosed().subscribe((updated: Training) => {
      if (updated) {
        const index = this.dataSource.data.findIndex(t => t._id === updated._id);
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
    this.confirmDialogService.open({
      title: 'Remove Training?',
      message: `Are you sure you want to remove ${training.name} from the catalog?`,
      cancelId: 'cancel-training-delete',
      confirmId: 'confirm-training-delete',
      confirmText: 'Remove'
    }).subscribe(confirmed => {
      if (confirmed) {
        this.trainingService.deleteTraining(training._id)
          .subscribe(deletedTraining => {
            this.dataSource.data = this.dataSource.data.filter((t: Training) => t._id !== deletedTraining._id);
            this.matSnackBar.open(`Training ${deletedTraining.name} removed from catalog`);
          });
      }
    });
  }
}
