package com.coveros.codeveros.util;

import java.io.InputStream;
import java.util.Properties;

public class ConfigurationReader {
    private static Properties configFile;

    static {
        try {
            String filename = "configuration.properties";
            InputStream is = ConfigurationReader.class.getClassLoader().getResourceAsStream(filename);
            configFile = new Properties();
            configFile.load(is);
            is.close();
        }catch(Exception e) {
            e.printStackTrace();
        }
    }
    public static String getProperty(String keyName) {
        return configFile.getProperty(keyName);
    }

}
