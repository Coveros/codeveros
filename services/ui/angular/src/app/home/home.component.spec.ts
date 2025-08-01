import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../auth/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home.component';
import { SharedModule } from '../shared/shared.module';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let authServiceStub: Partial<AuthService>;

  beforeEach(waitForAsync(() => {
    authServiceStub = {
      getLoggedInUser: () => ({
        _id: '123',
        username: 'testuser',
        firstName: 'bob',
        lastName: 'bob',
        email: 'bob@bob.com',
      }),
    };

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [BrowserAnimationsModule, SharedModule],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceStub,
        },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
