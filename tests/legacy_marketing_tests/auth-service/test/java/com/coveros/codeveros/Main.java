package com.coveros.codeveros;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;


public class Main {

    public final Element header;
    public Element registrationPageLogo;

    public Main(App app) {

        header = app.newElement(Locator.CSS, "div.page-title");
        registrationPageLogo = app.newElement(Locator.ID, "mat-tab-label-0-1");
    }

    public void assertHeader() {

        header.waitForState().displayed();
        header.assertEquals().text("Welcome to CODEveros");
    }

    public void goToRegistrationSection(){

        registrationPageLogo.click();
        registrationPageLogo.waitForState();
    }
}
