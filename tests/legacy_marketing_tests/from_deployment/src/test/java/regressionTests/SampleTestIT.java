package regressionTests;

import com.coveros.selenified.Selenified;
import org.testng.Assert;
import org.testng.ITestContext;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class SampleTestIT extends Selenified {

    @BeforeClass(alwaysRun = true)
    public void beforeClass(ITestContext test) {
        // set the base URL for the tests here
        setAppURL(this, test, "http://localhost/");
        // set the author of the tests here
        setAuthor(this, test, "Ana Skvortsova\n<br/>ana.skvortsova@coveros.com");
        // set the version of the tests or of the software, possibly with a dynamic check
        setVersion(this, test, "3.2.1");
    }

    @Test (description = "sample test", groups = {"sample"})
    public void sampleTest(){
        Assert.assertEquals(1, 1);
    }

}
