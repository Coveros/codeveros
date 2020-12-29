package functional;

import com.coveros.selenified.Selenified;
import objects.User;
import org.testng.ITestContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pom.Login;
import pom.MainPage;
import pom.Register;
import pom.UsersPage;

import java.io.IOException;
import java.util.UUID;

public class UsersIT extends Selenified {

    User user;
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
        String username = UUID.randomUUID().toString();
        String password = "password";
        user = register.createUserViaAPI(username + "@coveros.com", "Random", "User", username, password);
        login.login(username, password);
        login.assertLoginSuccess();
        MainPage mainPage = new MainPage(this.apps.get());
        mainPage.goToUsers();
    }

    @Test(description = "")
    public void accessUserPage(){
        UsersPage usersPage = new UsersPage(this.apps.get(), this.calls.get(), user);
        usersPage.assertUserPage();
        finish();
    }

    @Test(description = "")
    public void addUserTest(){
        UsersPage usersPage = new UsersPage(this.apps.get(), this.calls.get(), user);
        usersPage.addUser();
        finish();
    }

    @Test(description = "")
    public void editUserTest(){
        UsersPage usersPage = new UsersPage(this.apps.get(), this.calls.get(), user);
        usersPage.editUser(user);
        finish();
    }

    @Test(description = "")
    public void deleteUserTest(){
        UsersPage usersPage = new UsersPage(this.apps.get(), this.calls.get(), user);
        User newUser = usersPage.addUser();
        usersPage.deleteUser(newUser);
        finish();
    }

}
