package com.nicolas.my_library.controllers;

import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.nicolas.my_library.services.AuthorService;

@SpringBootTest
@ActiveProfiles("test")
public class AuthorControllerTests {
    @MockitoBean
    private AuthorService authorService;

    @Test
    void testGetAuthors() {
        final AuthorController authorController = new AuthorController(authorService);
        authorController.getAuthors();

        verify(authorService, times(1)).getAuthors();
    }
}
