package net.astec.person.config;

import net.astec.person.entity.Person;
import net.astec.person.repository.PersonRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class PersonConfig {

    @Bean
    CommandLineRunner commandLineRunner(PersonRepository personRepository) {
        return args -> {
            Person hubert = new Person("Hubert");
            Person kacper = new Person("Kacper");
            personRepository.saveAll(List.of(hubert, kacper));
        };
    }
}
