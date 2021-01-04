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
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class UserAPIFailTestsIT extends Selenified {

    private UserResource usersResource;

    @BeforeClass(alwaysRun = true)
    public void beforeClass(ITestContext test) {
        // set the base URL for the tests here
        setAppURL(this, test, "http://localhost/");
        // set the author of the tests here
        setAuthor(this, test, "TEAM-QA\n<br/>quality@coveros.com");
        // set the version of the tests or of the software, possibly with a dynamic check
        setVersion(this, test, "3.3.0");
    }

    @BeforeMethod(alwaysRun = true)
    public void beforeMethod() {
        usersResource = new UserResource(this.apps.get(), this.calls.get());
    }

    /**
     * This test is intended to fail and self recover in alternating order of execution.
     * -First run creates UNAUTHORIZED_USER in users table and will not detect it.
     * -Second run will detect UNAUTHORIZED_USER, fail the test and delete UNAUTHORIZED_USER.
     * -Next execution will pass and create UNAUTHORIZED_USER behind it.
     */
    @Test(priority = 1, description = "Verify no \"UNAUTHORIZED_USER\" exists in the users table", groups = {"apiTests"})
    public void verifyAuthorizedUsers() {

        String authToken = ConfigurationReader.getProperty("tokenStatic");
        RestAssured.baseURI = System.getProperty("appURL");
        RequestSpecification httpRequest = RestAssured.given();
        httpRequest.header("Content-Type", "application/json");
        httpRequest.header("Authorization", authToken);
        io.restassured.response.Response response = httpRequest.get("api/user");

        Gson gson = new Gson();
        List<Map<String, String>> jsonArray = gson.fromJson(response.getBody().asString(), ArrayList.class);

        List<String> nameList = new ArrayList<>();
        for (Map<String, String> nameMap : jsonArray) {
            nameList.add(nameMap.get("firstName"));
        }

        App app = this.apps.get();
        Reporter reporter = app.getReporter();
        if (nameList.contains("UNAUTHORIZED_USER")) {
            reporter.fail("Assert no \"UNAUTHORIZED_USER\" present in the users table",
                    "\'UNAUTHORIZED_USER\' - >>NOT FOUND<<", "\'UNAUTHORIZED_USER\' - >>FOUND<<");
        } else {
            reporter.pass("Assert no \"UNAUTHORIZED_USER\" present in the users table",
                    "\'UNAUTHORIZED_USER\' - >>NOT FOUND<<", "\'UNAUTHORIZED_USER\' - >>NOT FOUND<<");
        }

        Call call = this.calls.get();
        JsonObject userInformation = new JsonObject();

        //create admin user with admin123 password
        try {
            userInformation.addProperty("email", "admin@coveros.com");
            userInformation.addProperty("firstName", "Authorized");
            userInformation.addProperty("lastName", "User");
            userInformation.addProperty("username", "admin");
            userInformation.addProperty("password", "admin123");
            userInformation.addProperty("confirmPassword", "admin123");
            call.post("api/auth/register", new Request().setJsonPayload(userInformation));
        } catch (Exception e) {
            e.printStackTrace();
        }
        //create UNAUTHORIZED_USER
        userInformation = new JsonObject();
        userInformation.addProperty("email", "UNAUTHORIZED_USER@coveros.com");
        userInformation.addProperty("firstName", "UNAUTHORIZED_USER");
        userInformation.addProperty("lastName", "Threat");
        userInformation.addProperty("username", "Cyber");
        userInformation.addProperty("password", "password");
        userInformation.addProperty("confirmPassword", "password");
        call.post("api/auth/register", new Request().setJsonPayload(userInformation));

        List<String> sessionIds = new ArrayList<>();
        for (Map<String, String> idsMap : jsonArray) {
                sessionIds.add(idsMap.get("_id"));
        }

        for (String userId : sessionIds) {
            httpRequest.delete("api/user/" + userId);
        }
        
        finish();
    }
}

