package com.coveros.codeveros;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;
import org.openqa.selenium.Keys;

public class Login {

    private final App app;
    private final Element usernameInput;
    private final Element passwordInput;
    private final Element submitButton;
    private final Element usernameErrorField;
    private final Element passwordErrorField;
    private final Element errorMessageField;

    public Login(App app) {
        this.app = app;
        usernameInput = app.newElement(Locator.ID, "sign-in-username");
        passwordInput = app.newElement(Locator.ID, "sign-in-password");
        submitButton = app.newElement(Locator.ID, "sign-in-button");
        usernameErrorField = app.newElement(Locator.ID, "mat-error-0");
        passwordErrorField = app.newElement(Locator.ID, "mat-error-1");
        errorMessageField = app.newElement(Locator.XPATH, "//p[contains(text(),'Failed login')]");
    }

    public void fillOutLogin(String username, String password) {
        usernameInput.type(username);
        usernameInput.type(Keys.TAB);
        passwordInput.type(password);
        passwordInput.type(Keys.TAB);
    }

    public void login(String username, String password) {
        fillOutLogin(username, password);
        submitButton.click();
    }

    public void assertLoginFailure() {
        errorMessageField.waitForEquals().text("Failed login");
        errorMessageField.assertEquals().text("Failed login");
    }

    public void assertLoginSuccess() {
        new Main(app).assertHeader();
    }

    public void assertUsernameInputError() {
        usernameErrorField.waitForState().displayed();
        usernameErrorField.assertContains().text("This is required");
    }

    public void assertPasswordInputError() {
        passwordErrorField.waitForState().displayed();
        passwordErrorField.assertContains().text("This is required");
    }
}
