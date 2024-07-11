package <%= project.basePackage %>;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class <%= project.mainApp %> {

    public static void main(String[] args) {
        SpringApplication.run(<%= project.mainApp %>.class, args);
        log.info("<%= project.mainApp %> started successfully.");
    }

}
