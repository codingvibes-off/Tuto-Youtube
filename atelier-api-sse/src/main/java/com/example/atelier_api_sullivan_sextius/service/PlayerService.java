package com.example.atelier_api_sullivan_sextius.service;

import com.example.atelier_api_sullivan_sextius.dto.PlayerDTO;
import com.example.atelier_api_sullivan_sextius.dto.PlayerStatsDTO;
import com.example.atelier_api_sullivan_sextius.entity.Player;
import com.example.atelier_api_sullivan_sextius.exceptions.BadRequestException;
import com.example.atelier_api_sullivan_sextius.exceptions.InternalServerException;
import com.example.atelier_api_sullivan_sextius.exceptions.ResourceNotFoundException;
import com.example.atelier_api_sullivan_sextius.wrapper.PlayersResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static com.example.atelier_api_sullivan_sextius.entity.Player.convertCountryDTOToCountry;
import static com.example.atelier_api_sullivan_sextius.reader.PlayerJsonReader.savePlayersJsonFromApiToFile;

@Service
public class PlayerService {
    private final ObjectMapper MAPPER = new ObjectMapper();
    private  String json ;
    public PlayerService() {}
    @PostConstruct
    public void init() {
        try {
            String filePath = savePlayersJsonFromApiToFile("tmp/players.json");
            if(filePath != null) {
                json = Files.readString(Paths.get("tmp", "players.json"));
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
    private Long generateId() {
        return System.currentTimeMillis();
    }
    public List<Player> getAllPlayers() throws IOException {
        List<Player> players = MAPPER.readValue(json, PlayersResponse.class).getPlayers();
        return players;
    }
    public Player addPlayer(PlayerDTO dto) {
        if (dto.getFirstName() == null || dto.getLastName() == null || dto.getSex() == null) {
            throw new BadRequestException("Le prénom, le nom et le sexe sont obligatoires.");
        }
        if (dto.getCountry() == null || dto.getCountry().getCode() == null) {
            throw new BadRequestException("Le pays et son code sont obligatoires.");
        }

        try {
            Player player = new Player();
            player.setId(generateId());
            player.setFirstName(dto.getFirstName());
            player.setLastName(dto.getLastName());
            player.setSex(dto.getSex());
            player.setShortName(dto.getShortName());
            player.setPicture(dto.getPicture());
            player.setCountry(convertCountryDTOToCountry(dto.getCountry()));
            player.setData(dto.getData());

            List<Player> players = MAPPER.readValue(json, PlayersResponse.class).getPlayers();
            players.add(player);

            PlayersResponse updatedResponse = new PlayersResponse();
            updatedResponse.setPlayers(players);

            String updatedJson = MAPPER.writeValueAsString(updatedResponse);
            Files.writeString(Paths.get("tmp/players.json"), updatedJson);

            return player;

        } catch (IOException e) {
            throw new InternalServerException("Erreur lors de l'accès au fichier des joueurs.", e);
        }
    }
    public Player getPlayerById(Long id) throws IOException {
        return getAllPlayers().stream()
                .filter(player -> player.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Le joueur avec l'id " + id + " n'existe pas."));
    }

    private String getTopCountryByWinRatio(List<Player> players) {
        return players.stream()
                .collect(Collectors.groupingBy(p -> p.getCountry().getCode()))
                .entrySet()
                .stream()
                .max(Comparator.comparingDouble(entry -> {
                    List<Player> ps = entry.getValue();

                    double totalMatches = ps.stream()
                            .mapToInt(p -> {
                                if (p.getData() == null || p.getData().getLast() == null) return 0;
                                return p.getData().getLast().size();
                            })
                            .sum();

                    double totalWins = ps.stream()
                            .mapToInt(p -> {
                                if (p.getData() == null || p.getData().getLast() == null) return 0;
                                return (int) p.getData().getLast().stream().filter(result -> result == 1).count();
                            })
                            .sum();

                    return totalMatches == 0 ? 0.0 : totalWins / totalMatches;
                }))
                .map(Map.Entry::getKey)
                .orElse("Inconnu");

    }
    private double calculateAverageBmi(List<Player> players) {
        return players.stream()
                .mapToDouble(p -> {
                    if (p.getData() == null) return 0.0;
                    double heightInMeters = p.getData().getHeight() / 100.0;
                    double weightInKg = p.getData().getWeight() / 1000.0;
                    if (heightInMeters == 0) return 0.0;

                    return weightInKg / (heightInMeters * heightInMeters);
                })
                .average()
                .orElse(0.0);

    }
    private double calculateMedianHeight(List<Player> players) {
        List<Integer> heights = players.stream()
                .filter(p -> p.getData() != null)
                .map(p -> p.getData().getHeight())
                .sorted()
                .toList();

        int size = heights.size();
        if (size == 0) return 0.0;

        if (size % 2 == 0) {
            return (heights.get(size / 2 - 1) + heights.get(size / 2)) / 2.0;
        } else {
            return heights.get(size / 2);
        }
    }


    public PlayerStatsDTO getStatistics() throws IOException {
        List<Player> players = getAllPlayers();
        if (players.isEmpty()) {
            return PlayerStatsDTO.builder()
                    .topCountryByWinRatio("Aucun")
                    .averageBmi(0.0)
                    .medianHeight(0.0)
                    .build();
        }
        return PlayerStatsDTO.builder()
                .topCountryByWinRatio(getTopCountryByWinRatio(players))
                .averageBmi(calculateAverageBmi(players))
                .medianHeight(calculateMedianHeight(players))
                .build();
    }


}
