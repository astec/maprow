package net.astec.person.service;

import lombok.RequiredArgsConstructor;
import net.astec.person.entity.Person;
import net.astec.person.exception.PersonNotFoundException;
import net.astec.person.repository.PersonRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PersonService {


    private final PersonRepository personRepository;

    public List<Person> getPeople() {
        return personRepository.findAll();
    }

    public Person getPersonById(Long id) {
        return personRepository.findById(id).orElseThrow(() -> new PersonNotFoundException(id));
    }

    public Person getPersonByName(String name) {
        return personRepository.findPersonByName(name).orElseThrow(() -> new PersonNotFoundException(name));
    }
}
