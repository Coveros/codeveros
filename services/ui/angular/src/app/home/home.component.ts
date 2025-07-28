import {Component, OnDestroy, OnInit} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {Subject} from 'rxjs';
import {takeUntil, filter, map} from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import {ConfirmDialogService} from '../shared/confirm-dialog/confirm-dialog.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  sidenavOpen = true;
  sidenavMode = 'side';
  isMobile = false;
  isXs = false;
  username = '';

  private destroyed$ = new Subject<boolean>();

  constructor(
    private mediaOberver: MediaObserver,
    private authService: AuthService,
    private confirmDialogService: ConfirmDialogService
  ) {}

  ngOnInit(): void {
    this.mediaOberver.asObservable()
      .pipe(
        takeUntil(this.destroyed$),
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        this.isXs = (change.mqAlias === 'xs');
        this.isMobile = this.isXs || (change.mqAlias === 'sm');
        this.sidenavOpen = !this.isMobile;
        this.sidenavMode = (this.isMobile) ? 'over' : 'side';
      });
    const user = this.authService.getLoggedInUser();
    this.username = user.username;
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onMenuClick() {
    this.sidenavOpen = !this.sidenavOpen;
  }

  onSignOut() {
    this.confirmDialogService.open({
      title: 'Sign out?',
      message: 'Are you sure you want to sign out?',
      cancelId: 'cancel-sign-out',
      confirmId: 'confirm-sign-out'
    }).subscribe(confirmed => {
      if (confirmed) {
        this.authService.logout();
      }
    });
  }
}
