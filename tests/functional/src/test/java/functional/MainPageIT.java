package functional;

import com.coveros.selenified.Selenified;
import org.testng.ITestContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;
import org.testng.reporters.jq.Main;
import pom.Login;
import pom.MainPage;
import pom.Register;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

public class MainPageIT extends Selenified {

    @BeforeClass(alwaysRun = true)
    public void beforeClass(ITestContext test) {
      //set the base URL for the tests here
      setAppURL(this, test, "http://localhost/");
      //set the author of the tests here
      setAuthor(this, test, "Jona Qorri\n<br/>jona.qorri@coveros.com");
      //set the version of the tests or of the software, possibly with a dynamic check
      setVersion(this, test, "3.2.1");
    }

    @BeforeMethod(alwaysRun = true)
    public void beforeMethod() throws IOException {
      Register register = new Register(this.apps.get(), this.calls.get());
      Login login = new Login(this.apps.get());
      UUID uuid = UUID.randomUUID();
      String randomUUIDString = uuid.toString();
      register.createUserViaAPI(randomUUIDString + "@coveros.com", "Random", "User", randomUUIDString, "password");
      login.login(randomUUIDString, "password");
      login.assertLoginSuccess();

    }

    @Test(description = "Logging out of the application")
    public void logout(){
        MainPage mainPage = new MainPage(this.apps.get());
        mainPage.logoutConfirm();
        finish();
    }

    @Test(description = "Logging out of the application but canceling")
    public void cancelLogout(){
        MainPage mainPage = new MainPage(this.apps.get());
        mainPage.logoutCancel();
        finish();
    }

    @Test(description = "Accessing the users page")
    public void accessUsers(){
        MainPage mainPage = new MainPage(this.apps.get());
        mainPage.openMenu();
        mainPage.goToUsers();
        finish();
    }

    @Test(description = "Access the training page")
    public void accessTrainings(){
        MainPage mainPage = new MainPage(this.apps.get());
        mainPage.openMenu();
        mainPage.goToTrainings();
        finish();
    }

}
