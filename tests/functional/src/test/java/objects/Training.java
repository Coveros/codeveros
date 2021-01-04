package objects;

public class Training {


    private String id;
    private String name;
    private String description;
    private String type;
    private int duration;
    private String token;

    public Training(){}

    public Training(String name, String description, String type, int duration){
        this.name = name;
        this.description = description;
        this.type = type;
        this.duration = duration;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public String getToken() {
    return token;
  }

    public void setToken(String token) {
    this.token = token;
  }

}
