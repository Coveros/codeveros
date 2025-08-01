import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ConfirmDialogService } from '../shared/confirm-dialog/confirm-dialog.service';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  sidenavOpen = true;
  sidenavMode: MatDrawerMode = 'side';
  isMobile = false;
  isXs = false;
  username = '';

  private destroyed$ = new Subject<boolean>();

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private confirmDialogService: ConfirmDialogService,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((state: BreakpointState) => {
        this.isXs = state.breakpoints[Breakpoints.XSmall] ?? false;
        this.isMobile = this.isXs || (state.breakpoints[Breakpoints.Small] ?? false);
        this.sidenavOpen = !this.isMobile;
        this.sidenavMode = this.isMobile ? 'over' : 'side';
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
    this.confirmDialogService
      .open({
        title: 'Sign out?',
        message: 'Are you sure you want to sign out?',
        cancelId: 'cancel-sign-out',
        confirmId: 'confirm-sign-out',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.authService.logout();
        }
      });
  }
}
