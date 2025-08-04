package com.example.atelier_api_sullivan_sextius.controller;

import com.example.atelier_api_sullivan_sextius.dto.PlayerDTO;
import com.example.atelier_api_sullivan_sextius.dto.PlayerStatsDTO;
import com.example.atelier_api_sullivan_sextius.entity.Player;
import com.example.atelier_api_sullivan_sextius.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Comparator;
import java.util.List;

@RestController
@Controller
@RequestMapping("/api/players")
public class PlayerController {
    @Autowired
    private PlayerService playerService;


    @GetMapping
    public List<Player> getAllPlayers() throws IOException, InterruptedException {
        return playerService.getAllPlayers();
    }
    @GetMapping("/sorted")
    public List<Player> getPlayersSortedByRank() throws IOException, InterruptedException {
        List<Player> players = playerService.getAllPlayers();
        players.sort(Comparator.comparingInt(player -> player.getData().getRank()));
        return players;
    }
    @GetMapping("/{id}")
    public Player getById(@PathVariable Long id) throws IOException, InterruptedException {
        return playerService.getPlayerById(id);
    }
    @GetMapping("/stats")
    public PlayerStatsDTO getPlayerStats() throws IOException, InterruptedException {
        return playerService.getStatistics();
    }
    @PostMapping
    public ResponseEntity<Player> addPlayer(@RequestBody PlayerDTO dto) throws IOException {
        Player added = playerService.addPlayer(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(added);
    }


}
