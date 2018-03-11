package crimereport;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}
}

/*public class App {

	public static void main(String[] args) {
		try {
			Swarm swarm = new Swarm();

			WARArchive deployment = ShrinkWrap.create(WARArchive.class);

			deployment.staticContent();

			swarm.start().deploy(deployment);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
	

}*/
