import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { TrainingListComponent } from './training-list.component';
import { TrainingModule } from '../training.module';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('TrainingListComponent', () => {
  let component: TrainingListComponent;
  let fixture: ComponentFixture<TrainingListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [TrainingModule],
      providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
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
