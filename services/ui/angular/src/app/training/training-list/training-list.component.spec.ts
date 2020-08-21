import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TrainingListComponent } from './training-list.component';
import { TrainingModule } from '../training.module';

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TrainingModule, HttpClientTestingModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingListComponent);
    component = fixture.componentInstance;
  });

  it('should create the training list', () => {
    expect(component).toBeDefined();
  });

});
