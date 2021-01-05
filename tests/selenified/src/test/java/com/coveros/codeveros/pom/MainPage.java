package com.coveros.codeveros.pom;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;

public class MainPage {

    public final Element header;
    public final Element menuButton;
    public final Element usersButton;
    public final Element trainingButton;
    public final Element logoutButton;
    public final Element logoutPopUp;
    public final Element confirmLogoutButton;
    public final Element cancelLogoutButton;
    public final Element menuSideNav;

    public MainPage(App app) {
      menuSideNav = app.newElement(Locator.TAGNAME, "mat-sidenav");
      header = app.newElement(Locator.CSS, ".mat-display-2.page-title");
      menuButton = app.newElement(Locator.ID, "main-menu-toggle");
      usersButton = app.newElement(Locator.ID, "user-menu-item");
      trainingButton = app.newElement(Locator.ID, "training-menu-item");
      logoutButton = app.newElement(Locator.ID, "sign-out-button");
      logoutPopUp = app.newElement(Locator.ID, "mat-dialog-title-0");
      confirmLogoutButton = app.newElement(Locator.ID, "confirm-sign-out");
      cancelLogoutButton = app.newElement(Locator.ID, "cancel-sign-out");
    }

    public void assertHeader() {
        header.waitForState().displayed();
        header.assertEquals().text("Welcome to CODEveros");
    }

    public void openMenu(){
      boolean isOpened = menuSideNav.get().attribute("class").contains("mat-drawer-opened");
      if (!isOpened) {
        menuButton.waitForState().displayed();
        menuButton.click();
      }
    }

    public void goToUsers(){
      openMenu();
      usersButton.click();
    }

    public void goToTrainings(){
        openMenu();
        trainingButton.click();
    }

    public void logoutConfirm(){
        logoutButton.click();
        logoutPopUp.assertEquals().text("Sign out?");
        confirmLogoutButton.click();
    }

    public void logoutCancel(){
        logoutButton.click();
        logoutPopUp.assertEquals().text("Sign out?");
        cancelLogoutButton.click();
        header.waitForState().displayed();
        header.assertEquals().text("Welcome to CODEveros");
    }
}
