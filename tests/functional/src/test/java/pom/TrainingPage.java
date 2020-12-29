package pom;

import com.coveros.selenified.Locator;
import com.coveros.selenified.application.App;
import com.coveros.selenified.element.Element;
import com.coveros.selenified.services.Call;
import com.coveros.selenified.services.Request;
import com.coveros.selenified.services.Response;
import com.github.javafaker.Faker;
import com.google.gson.JsonObject;
import objects.Training;
import objects.User;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

public class TrainingPage {
    private final App app;
    private final Call call;
    private final User user;
    private final Element trainingTitle;
    private final Element addTraining;
    private final Element addTrainingPopUp;
    private final Element editTrainingPopUp;
    private final Element trainingName;
    private final Element trainingDescription;
    private final Element trainingType;
    private final Element trainingDuration;
    private final Element presentationTraining;
    private final Element workshopTraining;
    private final Element courseTraining;
    private final Element duration1;
    private final Element duration2;
    private final Element duration3;
    private final Element duration4;
    private final Element duration5;
    private final Element trainingSaveButton;

    private static final Random generator = new Random();
    static final String SOURCE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz";
    static SecureRandom secureRnd = new SecureRandom();

  public TrainingPage(App app, Call call, User user){
        this.app = app;
        this.call = call;
        this.user = user;
        trainingTitle = app.newElement(Locator.CLASSNAME, "mat-title");
        addTraining = app.newElement(Locator.ID, "add-training-button");
        addTrainingPopUp = app.newElement(Locator.CLASSNAME, "mat-dialog-container");
        editTrainingPopUp = app.newElement(Locator.CSS, "mat-dialog-title");
        trainingSaveButton = app.newElement(Locator.ID, "training-save-button");
        trainingName = app.newElement(Locator.ID, "training-name");
        trainingDescription = app.newElement(Locator.ID, "training-description");
        trainingType = app.newElement(Locator.ID, "training-type");
        trainingDuration = app.newElement(Locator.ID, "training-duration");
        presentationTraining = app.newElement(Locator.ID, "type-option-presentation");
        workshopTraining = app.newElement(Locator.ID, "type-option-workshop");
        courseTraining = app.newElement(Locator.ID, "type-option-course");
        duration1 = app.newElement(Locator.ID, "duration-option-1");
        duration2 = app.newElement(Locator.ID, "duration-option-2");
        duration3 = app.newElement(Locator.ID, "duration-option-3");
        duration4 = app.newElement(Locator.ID, "duration-option-4");
        duration5 = app.newElement(Locator.ID, "duration-option-5");
    }

    public void assertTrainingPage() {
        trainingTitle.waitForState().displayed();
        trainingTitle.assertEquals().text("Training Catalog");
    }

    public void editTraining(Training training) {
        if(training.getId() == null){
            training.setId(findTrainingID(training.getName()));
        }
        Element editButton = app.newElement(Locator.ID, "training-"+training.getId()).findChild(app.newElement(Locator.CSS, ".edit-training-button"));
        editButton.click();

        trainingName.clear();
        trainingName.type(randomString(5) + randomString(7));
        trainingDescription.clear();
        trainingDescription.type(randomString(5)+ randomString(5) + randomString(5)+randomString(5));
    }

    public void deleteTraining(Training training) {
        if(training.getId() == null){
            training.setId(findTrainingID(training.getName()));
        }
        Element deleteButton = app.newElement(Locator.ID, "training-"+training.getId()).findChild(app.newElement(Locator.CSS, ".delete-training-button"));
        deleteButton.hover();
        deleteButton.click();
    }

    public Training addTraining() {
      Faker faker = new Faker();

      return addTraining(
        faker.commerce().productName(),
        faker.company().catchPhrase(),
        "presentation",
        4
      );
    }

    // duration and type hardcoded for now and not used
    public Training addTraining(String name, String description, String type, int duration) {
      Training newTraining = new Training(name, description, type, duration);

      addTraining.click();
      addTrainingPopUp.waitForState().displayed();
      trainingName.type(newTraining.getName());
      trainingDescription.type(newTraining.getDescription());
      trainingType.click();
      presentationTraining.click();
      trainingDuration.click();
      duration4.click();
      trainingSaveButton.click();
      addTrainingPopUp.waitForState().notPresent();
      app.refresh();
      app.wait(5.0);
      newTraining.setId((findTrainingID(newTraining.getName())));
      return newTraining;
    }

    public Training addTrainingViaApi(String name, String description, String type, int duration){
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty("name", name);
        jsonObject.addProperty("description", description);
        jsonObject.addProperty("type", type);
        jsonObject.addProperty("duration", duration);
        Map<String, Object> headers = new HashMap<>();
        headers.put("Authorization", "Bearer " + user.getToken());
        call.addHeaders(headers);
        Request params = new Request();
        params.setJsonPayload(jsonObject);
        Response response = call.post("api/training", params);
        Training training = new Training();
        training.setId(response.getObjectData().get("_id").getAsString());
        training.setName(response.getObjectData().get("name").getAsString());
        training.setDescription(response.getObjectData().get("description").getAsString());
        training.setType(response.getObjectData().get("type").getAsString());
        training.setDuration(response.getObjectData().get("duration").getAsInt());
        //app.refresh();
        //training.setToken(response.getObjectData().get("token").getAsString());
        return training;
    }

    public String findTrainingID(String name){
        Element rows = app.newElement(Locator.CSS, ".element-row");
        for(int match = 0; match < rows.get().matchCount(); match++) {
            rows.setMatch(match);
            // Training Name not unique so this is not a determinative way to choose an exact training
            // todo: figure out if a better way is needed to capture a training ID
            if(rows.findChild(app.newElement(Locator.CSS, ".mat-column-name")).get().text().equals(name)) {
                return rows.get().attribute("id").replace("training-", "");
            }
        }
        return null;
    }

    public static String randomString(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++)
            sb.append(SOURCE.charAt(secureRnd.nextInt(SOURCE.length())));
        return sb.toString();
    }

}
