
package com.example.tacking.service;

import com.example.tacking.dto.DepenseDTO;
import com.example.tacking.dto.SuccessDTO;
import com.example.tacking.entity.Depense;
import com.example.tacking.entity.User;
import com.example.tacking.storage.TrackingRepository;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
@Service
public class DepenseService{
    
    private final TrackingRepository trackingRepository;
    public DepenseService(TrackingRepository trackingRepository){
        this.trackingRepository = trackingRepository;
    }
    public  List<Depense> getDepense(String id){
        return trackingRepository.getDepense(id);
    }
    public List<Depense> getAllDepenses(){
       return trackingRepository.getAllDepenses();
    }

    public  List<Depense>  putDepense(String id, User user){
        return trackingRepository.putDepense(id, user);
    }

    public  SuccessDTO deleteDepense(String id){
        return trackingRepository.deleteDepense(id);
    }
    public   List<Depense> postDepense(User user){
        return trackingRepository.postDepense(user);
    }

}