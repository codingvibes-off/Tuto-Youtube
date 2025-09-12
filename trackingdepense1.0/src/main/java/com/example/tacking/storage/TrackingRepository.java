package com.example.tacking.storage;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.springframework.stereotype.Repository;

import com.example.tacking.dto.SuccessDTO;
import com.example.tacking.entity.Depense;
import com.example.tacking.entity.User;
import com.example.tacking.entity.Users;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.annotation.PostConstruct;

@Repository
public class TrackingRepository {
    Map<String, User> trackingDatabase = new HashMap();
    private ObjectMapper mapper = new  ObjectMapper();
    public TrackingRepository(){}
    public List<Depense> getAllDepenses(){
        List<Depense> listDepensesUser = new ArrayList<>();
        for (Entry<String, User> entry : trackingDatabase.entrySet()) {
            listDepensesUser.addAll(entry.getValue().getDepenses());
        }
        return listDepensesUser;
    }

     public String loadJsonFromResources(String filename) throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        try (InputStream inputStream = classLoader.getResourceAsStream(filename)) {
            if (inputStream == null) {
                throw new IOException("The file '" + filename + "' was not found in /resources");
            }
            return new String(inputStream.readAllBytes(), StandardCharsets.UTF_8);
        }
    }

    @PostConstruct
    public void initUser() throws IOException{
        String json = loadJsonFromResources("database.json");
        Users response = mapper.readValue(json, Users.class);
        for(User user: response.getUsers()){
            trackingDatabase.put(user.getId().toString(),user);
        }
    }

    public  List<Depense> getDepense(String id){
        return trackingDatabase.get(id).getDepenses();
    }

    public List<Depense> putDepense(String id, User user){
        trackingDatabase.put(id, user);
        return user.getDepenses();
    }

    public SuccessDTO deleteDepense(String id){
         SuccessDTO successDTO = new SuccessDTO();
        System.out.println(trackingDatabase);
        if(trackingDatabase.get(id) != null){
            List<Depense> clear = new ArrayList<>();
            trackingDatabase.get(id).setDepenses(clear);
            successDTO.setSuccess(true);
            return successDTO;
        } else {
            successDTO.setSuccess(false);
            return successDTO;
        }
    
    }

    public List<Depense> postDepense(User user){
        trackingDatabase.put(user.getId(), user);
        return trackingDatabase.get(user.getId().toString()).getDepenses();
    }

}
