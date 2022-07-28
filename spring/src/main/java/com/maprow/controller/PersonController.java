package com.maprow.controller;

import com.maprow.model.Person;
import com.maprow.service.PersonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "person")
public class PersonController {

    @Autowired
    private PersonService personService;

    @GetMapping
    public List<Person> getPeople() {
        return personService.getPeople();
    }

    @GetMapping(path = "id/{id}")
    public Optional<Person> getPerson(@PathVariable("id") Long id) {
        return personService.getPerson(id);
    }

    @GetMapping(path = "name/{name}")
    public Optional<Person> getPerson(@PathVariable("name") String name) {
        return personService.getPerson(name);
    }
}
