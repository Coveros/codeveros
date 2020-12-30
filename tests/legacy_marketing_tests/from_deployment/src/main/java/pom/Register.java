package pom;

import com.coveros.selenified.application.App;
import com.coveros.selenified.services.Call;
import com.coveros.selenified.services.Request;
import com.coveros.selenified.services.Response;
import com.google.gson.JsonObject;

public class Register {

    final private App app;
    final private Call call;

    public Register(App app, Call call) {
        this.app = app;
        this.call = call;
    }

    //TODO - should truly move this into the correct project, but for this orchestration, leaving it here for now
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
}
