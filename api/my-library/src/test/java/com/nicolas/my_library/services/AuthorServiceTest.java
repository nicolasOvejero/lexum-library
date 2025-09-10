package com.nicolas.my_library.services;

import com.nicolas.my_library.controllers.BookController;
import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.entities.Author;
import com.nicolas.my_library.mocks.AuthorMock;
import com.nicolas.my_library.repositories.AuthorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
public class AuthorServiceTest {
    @MockitoBean
    private AuthorRepository authorRepository;

    @Test
    void testGetAuthors() {
        final AuthorService authorService = new AuthorService(authorRepository);

        final List<Author> authorsEntities = new ArrayList<>();
        authorsEntities.add(AuthorMock.getAuthorEntity1());
        authorsEntities.add(AuthorMock.getAuthorEntity2());

        when(authorRepository.findAll()).thenReturn(authorsEntities);

        final List<AuthorDTO> authors = authorService.getAuthors();

        verify(authorRepository, times(1)).findAll();
        assertEquals(2,  authors.size());
        assertEquals(AuthorMock.getAuthor1(), authors.get(0));
        assertEquals(AuthorMock.getAuthor2(), authors.get(1));
    }

    @Test
    void testGetAuthorWithoutId() {
        final AuthorService authorService = new AuthorService(authorRepository);

        final AuthorDTO authorDTONoId = AuthorMock.getAuthor1();
        authorDTONoId.setId(null);
        final Author authors = authorService.getAuthor(authorDTONoId);

        assertEquals(authors.getLastname(), AuthorMock.getAuthor1().getLastname());
        assertEquals(authors.getFirstname(), AuthorMock.getAuthor1().getFirstname());
    }

    @Test
    void testGetAuthorWithId() {
        final AuthorService authorService = new AuthorService(authorRepository);

        when(authorRepository.findById("id-test-1")).thenReturn(Optional.of(AuthorMock.getAuthorEntity1()));

        final Author authors = authorService.getAuthor(AuthorMock.getAuthor1());

        verify(authorRepository, times(1)).findById("id-test-1");
        assertEquals(authors.getId(), AuthorMock.getAuthor1().getId());
        assertEquals(authors.getLastname(), AuthorMock.getAuthor1().getLastname());
        assertEquals(authors.getFirstname(), AuthorMock.getAuthor1().getFirstname());
    }

    @Test
    void testGetAuthorThrowError() {
        final AuthorService authorService = new AuthorService(authorRepository);

        when(authorRepository.findById("id-test-1")).thenReturn(Optional.empty());

        try {
            authorService.getAuthor(AuthorMock.getAuthor1());
        } catch (EntityNotFoundException e) {
            verify(authorRepository, times(1)).findById("id-test-1");
            assertEquals("Author not found : id-test-1", e.getMessage());
        }

    }
}
