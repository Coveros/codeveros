package com.coveros.codeveros.pom;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;
import com.coveros.selenified.services.Call;
import com.coveros.selenified.services.Request;
import com.coveros.selenified.services.Response;
import com.google.gson.JsonObject;
import com.coveros.codeveros.objects.User;

public class Register {

    final private App app;
    final private Call call;
    private Element firstNameInput;
    private Element lastNameInput;
    private Element userNameInput;
    private Element emailInput;
    private Element passwordInput;
    private Element confirmPasswordInput;
    private Element registerButton;

    public Register(App app, Call call) {
        this.app = app;
        this.call = call;
        firstNameInput = app.newElement(Locator.ID, "register-firstname");
        lastNameInput = app.newElement(Locator.ID, "register-lastname");
        userNameInput = app.newElement(Locator.ID, "register-username");
        emailInput = app.newElement(Locator.ID, "register-email");
        passwordInput = app.newElement(Locator.ID, "register-password");
        confirmPasswordInput = app.newElement(Locator.ID, "register-confirm-password");
        registerButton = app.newElement(Locator.ID, "register-button");
    }

    public User createUserViaAPI(String email, String firstName, String lastName, String username, String password) {
        JsonObject userInformation = new JsonObject();
        userInformation.addProperty("email", email);
        userInformation.addProperty("firstName", firstName);
        userInformation.addProperty("lastName", lastName);
        userInformation.addProperty("username", username);
        userInformation.addProperty("password", password);
        userInformation.addProperty("confirmPassword", password);
        Response response = call.post("api/auth/register", new Request().setJsonPayload(userInformation));
        User user = new User(email, firstName, lastName, username, password, response.getObjectData().get("user").getAsJsonObject().get("_id").getAsString());
        user.setToken(response.getObjectData().get("token").getAsString());
        return user;
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
        new MainPage(app).assertHeader();
    }
}
