package com.coveros.codeveros;

import com.coveros.selenified.application.App;
import com.coveros.selenified.services.Call;
import com.coveros.selenified.services.Request;
import com.coveros.selenified.services.Response;
import com.google.gson.JsonObject;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class UserResource {

    private User user;
    private Call call;
    private App app;

    public UserResource(App app, Call call){
        this.call = call;
    }

    public Response getAllUsers() {

        Call call = getInitializedCall();
        //get all existing users
        Response response = call.get("api/user/");
        return response;
    }

    public Response getAllUsersInvalidToken() {

        //get all existing users
        Response response = call.get("api/user/");
        return response;
    }

    public Response getUserById() {

        Call call = getInitializedCall();
        //get user by id
        Response response = call.get("api/user/" + user.getId());
        return response;
    }

    public Response getUserWithInvalidId() {

        //try to get user by invalid user id
        Response response = getInitializedCall().get("api/user/mnm");
        return response;
    }

    public Response createNewUser(String firstName, String lastName, String password) {

        Call call = getInitializedCall();
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        //set up new user credentials
        JsonObject userInformation = new JsonObject();
        userInformation.addProperty("firstName", firstName);
        userInformation.addProperty("lastName", lastName);
        userInformation.addProperty("username", randomUUIDString);
        userInformation.addProperty("email", randomUUIDString + "@coveros.com");
        userInformation.addProperty("password", password);
        //create user with given credentials
        Response response = call.post("api/user/", new Request().setJsonPayload(userInformation));
        return response;
    }

    public Response createNewUserInvalidCredentials() {

        Call call = getInitializedCall();
        //create an empty json object
        JsonObject userInformation = new JsonObject();
        //create user with empty json
        Response response = call.post("api/user/", new Request().setJsonPayload(userInformation));
        return response;
    }

    public Response changeExistingUserName(String firstName) {

        Call call = getInitializedCall();
        //set up new user credentials
        JsonObject updatedUserInformation = new JsonObject();
        updatedUserInformation.addProperty("firstName", firstName);
        updatedUserInformation.addProperty("lastName", user.getLastName());
        updatedUserInformation.addProperty("username", user.getUsername());
        updatedUserInformation.addProperty("email", user.getEmail());
        //update user info
        Response response = call.put("api/user/" + user.getId(), new Request().setJsonPayload(updatedUserInformation));
        return response;
    }

    public Response deleteUserById(){

        Call call = getInitializedCall();
        //delete user by id
        Response response = call.delete("api/user/"+user.getId());
        return response;
    }

    private String registerNewUserAndGetToken(App app, Call call) {

        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        Register register = new Register(app, call);
        user = register.createUserViaAPI(randomUUIDString + "@coveros.com", "Random", "com.coveros.codeveros.User", randomUUIDString, "password");
        return user.getToken();
    }

    private Call getInitializedCall() {

        Map<String, Object> headers = new HashMap<>();
        headers.put("Authorization", "Bearer "+ registerNewUserAndGetToken(app, call));
        call.addHeaders(headers);
        return call;
    }
}

