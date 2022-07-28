package com.maprow.config;

import com.maprow.model.Person;
import com.maprow.repository.PersonRepository;
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
