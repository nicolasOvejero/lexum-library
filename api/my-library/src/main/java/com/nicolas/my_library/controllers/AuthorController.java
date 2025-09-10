package com.nicolas.my_library.controllers;

import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.services.AuthorService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuthorController {
    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping(value = "/authors")
    public List<AuthorDTO> getAuthors() {
        return this.authorService.getAuthors();
    }
}
