package com.example.tacking.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.tacking.service.DepenseService;

@RestController
@RequestMapping("/depenses")
public class DepenseController {
    private final DepenseService depenseService;
    public DepenseController(DepenseService depenseService){
        this.depenseService = depenseService;
    }
    @GetMapping("/")
    public String getAllDepense() {
        return "Hello";
    }
   /*@GetMapping("/{id}")
    public List<Depense> getDepense(@RequestParam String id) {
        return depenseService.getDepense(id);
    }

    @PostMapping("/")
    public List<Depense> postDepense(@RequestBody User user) {
        return depenseService.postDepense(user);
    }

    @PutMapping("/{id}") 
    public List<Depense> putDepense(@PathVariable String id, @RequestBody User user) {
        return depenseService.putDepense(id, user);
    }

    @DeleteMapping("/{id}")
    public SuccessDTO deleteDepense(@PathVariable String id) {
        return depenseService.deleteDepense(id);
    }*/
}




