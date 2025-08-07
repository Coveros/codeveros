import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { ConfirmDialogService } from '../shared/confirm-dialog/confirm-dialog.service';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import {
  MatDrawerMode,
  MatSidenavContainer,
  MatSidenav,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import {
  MatNavList,
  MatListSubheaderCssMatStyler,
  MatListItem,
} from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatNavList,
    MatListSubheaderCssMatStyler,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    MatSidenavContent,
    RouterOutlet,
  ],
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
        this.isMobile =
          this.isXs || (state.breakpoints[Breakpoints.Small] ?? false);
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
