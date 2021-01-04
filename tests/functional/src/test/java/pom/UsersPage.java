package pom;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;
import com.coveros.selenified.services.Call;
import com.github.javafaker.Faker;
import objects.User;
import java.security.SecureRandom;
import java.util.Random;


public class UsersPage {

    private final App app;
    private final Call call;
    private final User user;
    private final Element userTitle;
    private final Element addUser;
    private final Element addUserPopUpTitle;
    private final Element removeUser;
    private final Element editUser;
    private final Element addUserPopUp;
    private final Element editUserPopUp;
    private final Element usernameInput;
    private final Element firstNameInput;
    private final Element lastNameInput;
    private final Element emailAddressInput;
    private final Element passwordInput;
    private final Element confirmPasswordInput;
    private final Element cancel;
    private final Element save;
    private final Element remove;
    private final Element cancelDelete;

    private static final Random generator = new Random();
    static final String SOURCE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";
    static SecureRandom secureRnd = new SecureRandom();

    public UsersPage(App app, Call call, User user){
        this.app = app;
        this.call = call;
        this.user = user;
        userTitle = app.newElement(Locator.CLASSNAME, "mat-title");

        addUserPopUpTitle = app.newElement(Locator.CLASSNAME, "mat-dialog-title");
        addUser = app.newElement(Locator.ID, "add-user-button");
        removeUser = app.newElement(Locator.ID, "");
        editUser = app.newElement(Locator.ID, "");
        addUserPopUp = app.newElement(Locator.ID, "");
        editUserPopUp = app.newElement(Locator.CLASSNAME, "mat-dialog-title");
        usernameInput = app.newElement(Locator.ID, "user-username");
        firstNameInput = app.newElement(Locator.ID, "user-firstname");
        lastNameInput = app.newElement(Locator.ID, "user-lastname");
        emailAddressInput = app.newElement(Locator.ID, "user-email");
        passwordInput = app.newElement(Locator.ID, "user-password");
        confirmPasswordInput = app.newElement(Locator.ID, "user-confirm-password");
        cancel = app.newElement(Locator.ID, "user-cancel-button");
        save = app.newElement(Locator.ID, "user-save-button");
        remove = app.newElement(Locator.ID, "confirm-user-delete");
        cancelDelete = app.newElement(Locator.ID, "cancel-user-delete");
    }

    public void assertUserPage(){
        userTitle.waitForState().displayed();
        userTitle.assertEquals().text("User List");
    }

    public User addUser() {
        Faker faker = new Faker();

        return addUser(
                faker.internet().emailAddress(),
                faker.name().firstName(),
                faker.name().lastName(),
                faker.name().username() + faker.random().hex(),
                faker.internet().password()
        );
    }

    public User addUser(String email, String firstName, String lastName, String username, String password) {
        User newUser = new User(email, firstName, lastName, username, password, null);
        addUser.click();
        addUserPopUpTitle.waitForState().displayed();
        addUserPopUpTitle.assertEquals().text("Add User");
        firstNameInput.type(newUser.getFirstName());
        lastNameInput.type(newUser.getLastName());
        emailAddressInput.type(newUser.getEmail());
        usernameInput.type(newUser.getUsername());
        passwordInput.type(newUser.getPassword());
        confirmPasswordInput.type(newUser.getPassword());
        save.click();
        newUser.setId(findUserID(newUser.getUsername()));
        return newUser;
    }

    public void deleteUser(User user){
        if(user.getId() == null){
            user.setId(findUserID(user.getUsername()));
        }
        Element deleteButton = app.newElement(Locator.ID, "user-"+user.getId()).findChild(app.newElement(Locator.CSS, ".delete-user-button"));
        deleteButton.hover();
        deleteButton.click();
        cancelDelete.click();
        deleteButton.click();
        remove.click();
    }

    public void editUser(User user){
        if(user.getId() == null){
            user.setId(findUserID(user.getUsername()));
        }
        Element editButton = app.newElement(Locator.ID, "user-"+user.getId()).findChild(app.newElement(Locator.CSS, ".edit-user-button"));
        editButton.click();

        cancel.click();
        editButton.click();
        usernameInput.clear();
        usernameInput.type(randomString(6));
        save.click();
    }

    public String findUserID(String username){
        Element rows = app.newElement(Locator.CSS, ".element-row");
        for(int match = 0; match < rows.get().matchCount(); match++){
            rows.setMatch(match);
            if (rows.findChild(app.newElement(Locator.CSS, ".mat-column-username")).get().text().equals(username)) {
                return rows.get().attribute("id").replace("user-", "");
            }
        }
        return null;
    }

    public static String randomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            sb.append(SOURCE.charAt(secureRnd.nextInt(SOURCE.length())));
        }
        return sb.toString();
    }
}
