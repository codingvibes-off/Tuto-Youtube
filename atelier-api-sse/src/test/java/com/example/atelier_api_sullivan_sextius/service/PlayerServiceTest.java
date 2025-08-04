package com.example.atelier_api_sullivan_sextius.service;

import com.example.atelier_api_sullivan_sextius.dto.CountryDTO;
import com.example.atelier_api_sullivan_sextius.dto.PlayerDTO;
import com.example.atelier_api_sullivan_sextius.dto.PlayerStatsDTO;
import com.example.atelier_api_sullivan_sextius.entity.Country;
import com.example.atelier_api_sullivan_sextius.entity.Player;
import com.example.atelier_api_sullivan_sextius.entity.StatsData;
import com.example.atelier_api_sullivan_sextius.exceptions.BadRequestException;
import com.example.atelier_api_sullivan_sextius.exceptions.ResourceNotFoundException;
import com.example.atelier_api_sullivan_sextius.wrapper.PlayersResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class PlayerServiceTest {

    private  PlayerService service;
    private ObjectMapper mapper = new ObjectMapper();

    public static final Long ROGER_ID = 1L;
    public static final String ROGER_FIRST_NAME = "Roger";
    public static final String ROGER_LAST_NAME = "Federer";
    public static final String ROGER_SEX = "M";
    public static final String ROGER_SHORT_NAME = "R. FED";
    public static final String ROGER_PICTURE = "pic1.jpg";
    public static final String ROGER_COUNTRY_CODE = "SUI";
    public static final String ROGER_COUNTRY_PICTURE = "http://example.fr";
    public static final int ROGER_HEIGHT = 185;
    public static final int ROGER_WEIGHT = 85000;
    public static final List<Integer> ROGER_LAST_MATCHES = List.of(1, 1, 0);


    public static final Long NADAL_ID = 2L;
    public static final String NADAL_FIRST_NAME = "Rafael";
    public static final String NADAL_LAST_NAME = "Nadal";
    public static final String NADAL_SEX = "M";
    public static final String NADAL_SHORT_NAME = "R. NAD";
    public static final String NADAL_PICTURE = "pic2.jpg";
    public static final String NADAL_COUNTRY_CODE = "SUI";
    public static final String NADAL_COUNTRY_PICTURE = "http://example.fr";
    public static final int NADAL_HEIGHT = 180;
    public static final int NADAL_WEIGHT = 83000;
    public static final List<Integer> NADAL_LAST_MATCHES = List.of(1, 0);


    public static final Long DJOKOVIC_ID = 3L;
    public static final String DJOKOVIC_FIRST_NAME = "Novak";
    public static final String DJOKOVIC_LAST_NAME = "Djokovic";
    public static final String DJOKOVIC_SEX = "M";
    public static final String DJOKOVIC_SHORT_NAME = "N. DJO";
    public static final String DJOKOVIC_PICTURE = "pic3.jpg";
    public static final String DJOKOVIC_COUNTRY_CODE = "SUI";
    public static final String DJOKOVIC_COUNTRY_PICTURE = "http://example.fr";

    public static Country createRogerCountry() {
        return Country.builder().code(ROGER_COUNTRY_CODE).picture(ROGER_COUNTRY_PICTURE).build();
    }

    public static StatsData createRogerStats() {
        return StatsData.builder().height(ROGER_HEIGHT).weight(ROGER_WEIGHT).last(ROGER_LAST_MATCHES).build();
    }

    public static Country createNadalCountry() {
        return Country.builder().code(NADAL_COUNTRY_CODE).picture(NADAL_COUNTRY_PICTURE).build();
    }

    public static StatsData createNadalStats() {
        return StatsData.builder().height(NADAL_HEIGHT).weight(NADAL_WEIGHT).last(NADAL_LAST_MATCHES).build();
    }

    public static Country createDjokovicCountry() {
        return Country.builder().code(DJOKOVIC_COUNTRY_CODE).picture(DJOKOVIC_COUNTRY_PICTURE).build();
    }
    @BeforeEach
    void setUp() throws IOException, NoSuchFieldException, IllegalAccessException {
        service = new PlayerService();
        Player player1 = Player.builder()
                .id(ROGER_ID)
                .firstName(ROGER_FIRST_NAME)
                .lastName(ROGER_LAST_NAME)
                .shortName(ROGER_SHORT_NAME)
                .sex(ROGER_SEX)
                .picture(ROGER_PICTURE)
                .country(createRogerCountry())
                .data(createRogerStats())
                .build();

        Player player2 = Player.builder()
                .id(NADAL_ID)
                .firstName(NADAL_FIRST_NAME)
                .lastName(NADAL_LAST_NAME)
                .shortName(NADAL_SHORT_NAME)
                .sex(NADAL_SEX)
                .picture(NADAL_PICTURE)
                .country(createNadalCountry())
                .data(createNadalStats())
                .build();

        Player player3 = Player.builder()
                .id(DJOKOVIC_ID)
                .firstName(DJOKOVIC_FIRST_NAME)
                .lastName(DJOKOVIC_LAST_NAME)
                .shortName(DJOKOVIC_SHORT_NAME)
                .sex(DJOKOVIC_SEX)
                .picture(DJOKOVIC_PICTURE)
                .country(createDjokovicCountry())
                .data(null)
                .build();


        PlayersResponse response = new PlayersResponse(List.of(player1, player2, player3));
        String json = mapper.writeValueAsString(response);

        var jsonField = PlayerService.class.getDeclaredField("json");
        jsonField.setAccessible(true);
        jsonField.set(service, json);
    }

    @Test
    void testGetAllPlayers() throws IOException {
        List<Player> players = service.getAllPlayers();
        assertEquals(3, players.size());
    }

    @Test
    void testGetPlayerById_Found() throws IOException {
        Player player = service.getPlayerById(1L);
        assertNotNull(player);
        assertEquals("Roger", player.getFirstName());
    }

    @Test
    void testGetStatistics() throws IOException, InterruptedException {
        PlayerStatsDTO stats = service.getStatistics();

        assertNotNull(stats);
        assertEquals("SUI", stats.getTopCountryByWinRatio());
        assertTrue(stats.getAverageBmi() > 0);
        assertEquals(182.5, stats.getMedianHeight());
    }

    @Test
    void testAddPlayer() throws IOException {
        PlayerDTO dto = new PlayerDTO();
        dto.setFirstName("Andy");
        dto.setLastName("Murray");
        dto.setSex("M");
        dto.setShortName("A. MUR");
        dto.setPicture("pic4.jpg");
        dto.setCountry(CountryDTO.builder().code("GBR").picture("http://example.fr").build());
        dto.setData(StatsData.builder()
                .height(180)
                .weight(78000)
                .last(List.of(1, 1))
                .build());

        Player added = service.addPlayer(dto);
        assertNotNull(added.getId());
        assertEquals("Andy", added.getFirstName());

        List<Player> players = service.getAllPlayers();
        assertEquals(3, players.size());
    }
    @Test
    void addPlayer_shouldThrowBadRequestException_whenFirstNameIsNull() {
        PlayerDTO dto = new PlayerDTO();
        dto.setFirstName(null);
        dto.setLastName("Murray");
        dto.setSex("M");
        dto.setCountry(CountryDTO.builder().code("GBR").build());

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            service.addPlayer(dto);
        });

        assertEquals("Le prénom, le nom et le sexe sont obligatoires.", ex.getMessage());
    }
    @Test
    void addPlayer_shouldThrowBadRequestException_whenLastNameIsNull() {
        PlayerDTO dto = new PlayerDTO();
        dto.setFirstName("Andy");
        dto.setLastName(null);
        dto.setCountry(CountryDTO.builder().code("GBR").build());

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            service.addPlayer(dto);
        });

        assertEquals("Le prénom, le nom et le sexe sont obligatoires.", ex.getMessage());
    }

    @Test
    void addPlayer_shouldThrowBadRequestException_whenSexIsNull() {
        PlayerDTO dto = new PlayerDTO();
        dto.setFirstName("Andy");
        dto.setLastName("Murray");
        dto.setSex(null);
        dto.setCountry(CountryDTO.builder().code("GBR").build());

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            service.addPlayer(dto);
        });

        assertEquals("Le prénom, le nom et le sexe sont obligatoires.", ex.getMessage());
    }

    @Test
    void addPlayer_shouldThrowBadRequestException_whenCountryIsNull() {
        PlayerDTO dto = new PlayerDTO();
        dto.setFirstName("Andy");
        dto.setLastName("Murray");
        dto.setSex("M");
        dto.setCountry(null);

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            service.addPlayer(dto);
        });

        assertEquals("Le pays et son code sont obligatoires.", ex.getMessage());
    }

    @Test
    void addPlayer_shouldThrowBadRequestException_whenCountryCodeIsNull() {
        PlayerDTO dto = new PlayerDTO();
        dto.setFirstName("Andy");
        dto.setLastName("Murray");
        dto.setSex("M");
        dto.setCountry(CountryDTO.builder().code(null).build());

        BadRequestException ex = assertThrows(BadRequestException.class, () -> {
            service.addPlayer(dto);
        });

        assertEquals("Le pays et son code sont obligatoires.", ex.getMessage());
    }

    @Test
    void getPlayerById_shouldThrowResourceNotFoundException_whenIdDoesNotExist() {
        Long invalidId = 999L;

        ResourceNotFoundException ex = assertThrows(ResourceNotFoundException.class, () -> {
            service.getPlayerById(invalidId);
        });
        assertEquals("Le joueur avec l'id " + invalidId + " n'existe pas.", ex.getMessage());
    }
    @Test
    void getPlayerById_shouldReturnPlayer_whenIdExists() throws IOException {

        Player player = service.getPlayerById(1L);

        assertNotNull(player);
        assertEquals(1L, player.getId());
    }



}
