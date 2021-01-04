package functionalTests;

import com.coveros.selenified.Selenified;
import org.testng.ITestContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

import com.coveros.codeveros.Login;
import com.coveros.codeveros.Register;

import java.util.UUID;

public class LoginIT extends Selenified {

    @BeforeClass(alwaysRun = true)
    public void beforeClass(ITestContext test) {
        // set the base URL for the tests here
        setAppURL(this, test, "http://localhost/");
        // set the author of the tests here
        setAuthor(this, test, "Coveros\n<br/>Coveros@coveros.com");
        // set the version of the tests or of the software, possibly with a dynamic check
        setVersion(this, test, "3.2.1");
    }

    @DataProvider(name = "invalid input", parallel = true)
    public Object[][] InvalidUsers() {
        return new Object[][]{new Object[]{"", ""}, new Object[]{"", "pass"}, new Object[]{"user", ""}};
    }

    @Test(dataProvider = "invalid input", description = "Login with some of the parameters not all filled out", groups = {"negative", "functional"})
    public void invalidInputTest(String username, String password) {
        Login login = new Login(this.apps.get());
        login.fillOutLogin(username, password);
        if ("".equals(username)) {
            login.assertUsernameInputError();
        }
        if ("".equals(password)) {
            login.assertPasswordInputError();
        }
        finish();
    }

    @Test(description = "Login with an invalid user", groups = {"compatibility", "negative", "functional"})
    public void invalidUserTest() {
        Login login = new Login(this.apps.get());
        login.login("user", "pass");
        login.assertLoginFailure();
        finish();
    }

    @Test(description = "Login with a valid user", groups = {"compatibility", "positive", "functional"})
    public void validUserTest() {
        Register register = new Register(this.apps.get(), this.calls.get());
        Login login = new Login(this.apps.get());
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        register.createUserViaAPI(randomUUIDString + "@coveros.com", "Random", "User", randomUUIDString, "password");
        login.login(randomUUIDString, "password");
        login.assertLoginSuccess();
        finish();
    }

    @Test(description = "Login with an invalid password", groups = {"negative", "functional"})
    public void validUserBadPasswordTest() {
        Register register = new Register(this.apps.get(), this.calls.get());
        Login login = new Login(this.apps.get());
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        register.createUserViaAPI(randomUUIDString + "@coveros.com", "Random", "User", randomUUIDString, "password");
        login.login(randomUUIDString, "password1");
        login.assertLoginFailure();
        finish();
    }
}
