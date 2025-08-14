import { Component, OnInit, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import { Training } from '../training.interface';
import { TrainingService } from '../training.service';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { TrainingDialogData } from './training-dialog-data.interface';

interface DurationOption {
  value: number;
  viewValue: string;
  id: string;
}

interface TypeOption {
  value: string;
  viewValue: string;
  id: string;
}

@Component({
  templateUrl: './training-dialog.component.html',
  styleUrls: ['./training-dialog.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    CdkTextareaAutosize,
    MatSelect,
    MatOption,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class TrainingDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<TrainingDialogComponent>>(MatDialogRef);
  private readonly data = inject<TrainingDialogData>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly trainingService = inject(TrainingService);

  dialogForm: UntypedFormGroup;
  isSaving = false;
  isEdit = false;
  title: string;

  typeOptions: TypeOption[] = [
    {
      value: 'presentation',
      viewValue: 'Presentation',
      id: 'type-option-presentation',
    },
    { value: 'workshop', viewValue: 'Workshop', id: 'type-option-workshop' },
    { value: 'course', viewValue: 'Course', id: 'type-option-course' },
  ];

  durationOptions: DurationOption[] = [
    { value: 0.5, viewValue: '0.5', id: 'duration-option-0.5' },
    { value: 1, viewValue: '1', id: 'duration-option-1' },
    { value: 2, viewValue: '2', id: 'duration-option-2' },
    { value: 3, viewValue: '3', id: 'duration-option-3' },
    { value: 4, viewValue: '4', id: 'duration-option-4' },
    { value: 5, viewValue: '5', id: 'duration-option-5' },
  ];

  ngOnInit(): void {
    this.isEdit = !!this.data?.training?._id;
    this.title = this.isEdit ? 'Edit Training' : 'Add Training';

    this.dialogForm = this.formBuilder.group({
      name: [this.data?.training.name, Validators.required],
      description: [this.data?.training.description, Validators.required],
      type: [this.data?.training.type, Validators.required],
      duration: [this.data?.training.duration, Validators.required],
    });
  }

  onSubmit() {
    if (this.isSaving || this.dialogForm.invalid) {
      return;
    }

    this.isSaving = true;

    const value: Training = this.dialogForm.value;

    const request = this.isEdit
      ? this.trainingService.updateTraining(this.data?.training._id, value)
      : this.trainingService.createTraining(value);

    request.subscribe((returnValue: Training) => {
      this.isSaving = false;
      this.dialogRef.close(returnValue);
    });
  }
}
