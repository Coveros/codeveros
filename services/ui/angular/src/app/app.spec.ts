import { TestBed, waitForAsync, ComponentFixture } from '@angular/core/testing';
import { App } from './app';
import { SharedModule } from './shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('App', () => {
  let component: App;
  let fixture: ComponentFixture<App>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, App],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });
});
