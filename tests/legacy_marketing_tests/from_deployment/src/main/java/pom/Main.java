package pom;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;

public class Main {

    public final Element header;

    public Main(App app) {
        header = app.newElement(Locator.CSS, "div.page-title");
    }

    public void assertHeader() {
        header.waitForState().displayed();
        header.assertEquals().text("Welcome to Codeveros");
    }
}

