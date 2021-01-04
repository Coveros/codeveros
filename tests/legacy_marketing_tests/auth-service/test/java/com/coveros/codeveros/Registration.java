package com.coveros.codeveros;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;

public class Registration {

    private final App app;
    private Element firstNameInput;
    private Element lastNameInput;
    private Element userNameInput;
    private Element emailInput;
    private Element passwordInput;
    private Element confirmPasswordInput;
    private Element registerButton;

    public Registration(App app){

        this.app = app;
        firstNameInput = app.newElement(Locator.ID,"mat-input-2");
        lastNameInput = app.newElement(Locator.ID,"mat-input-3");
        userNameInput = app.newElement(Locator.ID,"mat-input-4");
        emailInput = app.newElement(Locator.ID,"mat-input-5");
        passwordInput = app.newElement(Locator.ID,"mat-input-6");
        confirmPasswordInput = app.newElement(Locator.ID,"mat-input-7");
        registerButton = app.newElement(Locator.CSS, "button[type='submit']");
    }

    public void fillOutRegistrationForm(String firstName, String lastName, String userName, String email, String password, String confirmPassword){

        firstNameInput.waitForState().displayed();
        firstNameInput.type(firstName);
        lastNameInput.type(lastName);
        userNameInput.type(userName);
        emailInput.type(email);
        passwordInput.type(password);
        confirmPasswordInput.type(confirmPassword);
    }

    public void registerNewUser(String firstName, String lastName, String userName, String email, String password, String confirmPassword){

        fillOutRegistrationForm(firstName, lastName, userName, email, password, confirmPassword);
        registerButton.click();
    }

    public void assertRegistrationSuccess() {

        new Main(app).assertHeader();
    }

}


