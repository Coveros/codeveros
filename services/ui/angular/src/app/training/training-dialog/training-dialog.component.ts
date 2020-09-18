import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {Training} from '../training.interface';
import {TrainingService} from '../training.service';

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
  styleUrls: [ './training-dialog.component.scss' ]
})
export class TrainingDialogComponent implements OnInit {
  training: Training;
  dialogForm: FormGroup;
  isSaving = false;
  isEdit = false;
  title: string;

  typeOptions: TypeOption[] = [
    { value: 'presentation', viewValue: 'Presentation', id: 'type-option-presentation' },
    { value: 'workshop', viewValue: 'Workshop', id: 'type-option-workshop' },
    { value: 'course', viewValue: 'Course', id: 'type-option-course' }
  ];

  durationOptions: DurationOption[] = [
    { value: .5, viewValue: '0.5', id: 'duration-option-0.5' },
    { value: 1, viewValue: '1', id: 'duration-option-1' },
    { value: 2, viewValue: '2', id: 'duration-option-2' },
    { value: 3, viewValue: '3', id: 'duration-option-3' },
    { value: 4, viewValue: '4', id: 'duration-option-4' },
    { value: 5, viewValue: '5', id: 'duration-option-5' },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<TrainingDialogComponent>,
    private formBuilder: FormBuilder,
    private trainingService: TrainingService
  ) {
    this.training = data.training || {};
  }

  ngOnInit(): void {
    this.isEdit = !!(this.training && this.training._id);
    this.title = this.isEdit ? 'Edit Training' : 'Add Training';

    this.dialogForm = this.formBuilder.group({
      name: [ this.training.name, Validators.required ],
      description: [ this.training.description, Validators.required ],
      type: [ this.training.type, Validators.required ],
      duration: [ this.training.duration, Validators.required ],
    });
  }

  onSubmit() {
    if (this.isSaving || this.dialogForm.invalid) {
      return;
    }

    this.isSaving = true;

    const value: Training = this.dialogForm.value;

    const request = (this.isEdit) ?
      this.trainingService.updateTraining(this.training._id, value) :
      this.trainingService.createTraining(value);

    request.subscribe( (returnValue: Training) => {
      this.isSaving = false;
      this.dialogRef.close(returnValue);
    });
  }
}
