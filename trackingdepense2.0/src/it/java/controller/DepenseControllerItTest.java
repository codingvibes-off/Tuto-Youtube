import com.example.tacking.TackingApplication;

@ExtendWith({SpringExtension.class, PostgreSQLContainerExtension.class, S3ContainerExtension.class}) 
@SpringBootTest(classes = TackingApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@EnableAutoConfiguration(exclude = {
        JdbcRepositoriesAutoConfiguration.class})
@ActiveProfiles("test")
@AutoConfigureWebTestClient
public class DepenseControllerItTest {

@Autowired
private WebTestClient webTestClient;

}