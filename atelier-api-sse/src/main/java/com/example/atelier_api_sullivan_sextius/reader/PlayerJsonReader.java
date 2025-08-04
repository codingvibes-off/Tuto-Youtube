package com.example.atelier_api_sullivan_sextius.reader;

import com.example.atelier_api_sullivan_sextius.web.UrlMapping;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.file.Files;

public class PlayerJsonReader {

    public static String loadPlayersFromJson() throws IOException, InterruptedException {
        String url = UrlMapping.API_URL;

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        String json = response.body();
        return json;
    }
    public static String saveJsonToFile(String json, String path) throws IOException {
        File file = new File(path);
        File parent = file.getParentFile();
        if (parent != null && !parent.exists()) {
            Files.createDirectories(parent.toPath());
        }
        try (FileWriter writer = new FileWriter(file)) {
            writer.write(json);
            System.out.println("Le fichier est créee.");
            return json;
        }
    }

    public static String savePlayersJsonFromApiToFile(String filePath) throws IOException, InterruptedException {
        File file = new File(filePath);
        if (file.exists()) {
            System.out.println("Le fichier existe déjà, sauvegarde ignorée.");
            return Files.readString(file.toPath());
        }
        String json = loadPlayersFromJson();
        return saveJsonToFile(json, filePath);
    }

}
