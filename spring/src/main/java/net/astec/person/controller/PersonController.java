package net.astec.person.controller;

import lombok.RequiredArgsConstructor;
import net.astec.person.entity.Person;
import net.astec.person.service.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@RequiredArgsConstructor
public class PersonController {

    private final PersonService personService;

    @GetMapping
    public List<Person> getPeople() {
        return personService.getPeople();
    }

    @GetMapping(path = "person/{id}")
    public ResponseEntity<?> getPersonById(@PathVariable("id") Long id) {
        Person person = personService.getPersonById(id);

        return ResponseEntity.ok(person);
    }

    @GetMapping(path = "person")
    public ResponseEntity<?> getPersonByName(@RequestParam String name) {
        Person person = personService.getPersonByName(name);

        return ResponseEntity.ok(person);
    }


}
