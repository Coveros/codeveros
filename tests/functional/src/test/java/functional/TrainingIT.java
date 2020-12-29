package functional;

import com.coveros.selenified.Selenified;
import objects.Training;
import objects.User;
import org.testng.ITestContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import pom.Login;
import pom.MainPage;
import pom.Register;
import pom.TrainingPage;

import java.io.IOException;
import java.util.UUID;

public class TrainingIT extends Selenified {
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
        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString();
        user = register.createUserViaAPI(randomUUIDString + "@coveros.com", "Random", "User", randomUUIDString, "password");
        //register.createUserViaAPI(randomUUIDString + "@coveros.com", "Random", "User", randomUUIDString, "password");
        Login login = new Login(this.apps.get());
        login.login(randomUUIDString, "password");
        login.assertLoginSuccess();
        MainPage mainPage = new MainPage(this.apps.get());
        mainPage.goToTrainings();
    }

    @Test(description = "")
    public void accessTrainingPage(){
        TrainingPage trainingPage = new TrainingPage(this.apps.get(), this.calls.get(), user);
        trainingPage.assertTrainingPage();
        finish();
    }

    @Test(description = "")
    public void addTrainingViaUI(){
        TrainingPage trainingPage = new TrainingPage(this.apps.get(), this.calls.get(), user);
        trainingPage.addTraining();
        finish();
    }

    @Test(description = "")
    public void editTraining(){
        TrainingPage trainingPage = new TrainingPage(this.apps.get(), this.calls.get(), user);
        Training training = trainingPage.addTraining();
        trainingPage.editTraining(training);
        finish();
    }

    @Test(description = "")
    public void deleteTraining(){
        TrainingPage trainingPage = new TrainingPage(this.apps.get(), this.calls.get(), user);
        Training training = trainingPage.addTraining();
        trainingPage.deleteTraining(training);
        finish();
    }
}
