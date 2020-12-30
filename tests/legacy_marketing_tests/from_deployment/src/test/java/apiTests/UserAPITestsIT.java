package apiTests;

import Base.ConfigurationReader;
import com.coveros.codeveros.UserResource;
import com.coveros.selenified.Selenified;
import com.coveros.selenified.application.App;
import com.coveros.selenified.services.Call;
import com.coveros.selenified.services.Request;
import com.coveros.selenified.services.Response;
import com.coveros.selenified.utilities.Reporter;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.restassured.RestAssured;
import io.restassured.specification.RequestSpecification;
import org.testng.ITestContext;
//import org.testng.Reporter;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserAPITestsIT extends Selenified {

    private UserResource usersResource;

    @BeforeClass(alwaysRun = true)
    public void beforeClass(ITestContext test) {
        // set the base URL for the tests here
        setAppURL(this, test, "http://localhost/");
        // set the author of the tests here
        setAuthor(this, test, "Ana Skvortsova\n<br/>ana.skvortsova@coveros.com");
        // set the version of the tests or of the software, possibly with a dynamic check
        setVersion(this, test, "3.2.1");
    }

    @BeforeMethod(alwaysRun = true)
    public void beforeMethod() {
        usersResource = new UserResource(this.apps.get(), this.calls.get());
    }

    //************GET REQUESTS***********
    @Test(description = "get all users", groups = {"apiTests"})
    public void getAllUsers() {

        //usersResource = new UserResource(this.apps.get(), this.calls.get());
        Response response = usersResource.getAllUsers();
        response.verifyEquals().code(200);
    }

    @Test(description = "get all users with invalid token", groups = {"apiTests"})
    public void getAllUsersInvalidToken() {

        Response response = usersResource.getAllUsersInvalidToken();
        response.verifyEquals().code(401);
    }

    @Test(description = "get user by id", groups = {"apiTests"})
    public void getUserById() {

        try {
            Response response = usersResource.getUserById();
            response.verifyEquals().code(200);
        } catch (NullPointerException e) {
            e.printStackTrace();
            System.out.println("User id is Null");
        }
    }

    @Test(description = "get a users invalid with invalid id", groups = {"apiTests"})
    public void getUserWithInvalidId() {

        Response response = usersResource.getUserWithInvalidId();
        response.verifyEquals().code(500);
    }

    //************POST REQUESTS***********
    @Test(description = "create a new user in Users table", groups = {"apiTests"})
    public void postNewUser() {

        Response response = usersResource.createNewUser("firstName", "lastName", "pass");
        response.verifyEquals().code(200);
        response.getObjectData().get("firstName").getAsString().equals("firstName");
    }

    @Test(description = "create a new user with invalid credentials", groups = {"apiTests"})
    public void postNewUserInvalidCredentials() {

        Response response = usersResource.createNewUserInvalidCredentials();
        response.verifyEquals().code(400);
    }

    //************PUT REQUESTS***********
    @Test(description = "change user name", groups = {"apiTests"})
    public void putNewNameForExistingUser() {

        Response response = usersResource.changeExistingUserName("newFirstName");
        response.verifyEquals().code(200);
        response.getObjectData().get("firstName").getAsString().equals("newFirstName");
    }

    //************DELETE REQUESTS***********
    @Test(description = "delete user by id", groups = {"apiTests"})
    public void deleteUser() {

        Response response = usersResource.deleteUserById();
        response.verifyEquals().code(200);
        //make sure that you cannot get deleted user
        String id = response.getObjectData().get("_id").getAsString();
        Call call = this.calls.get();

        call.get("api/user/" + id).verifyEquals().code(404);
    }
}

