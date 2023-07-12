package net.astec.person.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Person not found")
public class PersonNotFoundException extends RuntimeException {
    public PersonNotFoundException(Long id) {
        super("Could not found user with id: " + id);
    }

    public PersonNotFoundException(String name) {
        super("Could not found user with name: " + name);
    }
}
