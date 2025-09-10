package com.nicolas.my_library.controllers;

import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.mocks.AuthorMock;
import com.nicolas.my_library.mocks.BookMock;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;

import com.nicolas.my_library.dto.BookDTO;
import com.nicolas.my_library.services.BookService;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.*;

@SpringBootTest
@ActiveProfiles("test")
public class BookControllerTest {
    @MockitoBean
    private BookService bookService;

    @Test
    void testGetBooks() {
        final BookController bookController = new BookController(bookService);
        bookController.getBooks();

        verify(bookService, times(1)).getBooks();
    }

    @Test
    void testGetAuthorsBook() {
        final BookController bookController = new BookController(bookService);
        bookController.getBook("id-test");

        verify(bookService, times(1)).getBookById("id-test");
    }

    @Test
    void testPostCreateBook() {
        final BookController bookController = new BookController(bookService);
        final BookDTO bookDTO = BookMock.getBookDTO1();
        bookDTO.setId(null);

        final List<AuthorDTO> authors = new ArrayList<>();
        authors.add(AuthorMock.getAuthor1());

        bookDTO.setAuthors(authors);

        final BookDTO bookDTOReturned = BookMock.getBookDTO1();

        final List<AuthorDTO> authorsReturned = new ArrayList<>();
        authorsReturned.add(AuthorMock.getAuthor1());

        bookDTOReturned.setAuthors(authorsReturned);

        when(bookService.createBook(bookDTO)).thenReturn(bookDTOReturned);

        final BookDTO returnedBook = bookController.createBook(bookDTO);

        verify(bookService, times(1)).createBook(bookDTO);
        assertEquals(returnedBook, bookDTOReturned);
    }

    @Test
    void testPutUpdateBook() {
        final BookController bookController = new BookController(bookService);
        final BookDTO bookDTO = BookMock.getBookDTO1();
        bookDTO.setId(null);

        final List<AuthorDTO> authors = new ArrayList<>();
        authors.add(AuthorMock.getAuthor1());

        bookDTO.setAuthors(authors);

        final BookDTO bookDTOReturned = BookMock.getBookDTO1();

        final List<AuthorDTO> authorsReturned = new ArrayList<>();
        authorsReturned.add(AuthorMock.getAuthor1());

        bookDTOReturned.setAuthors(authorsReturned);

        when(bookService.updateBook("id-test", bookDTO)).thenReturn(bookDTOReturned);

        final BookDTO returnedBook = bookController.updateBook("id-test", bookDTO);

        verify(bookService, times(1)).updateBook("id-test", bookDTO);
        assertEquals(returnedBook, bookDTOReturned);
    }

    @Test
    void testDeleteBook() {
        final BookController bookController = new BookController(bookService);
        final ResponseEntity<Void> response = bookController.deleteBook("id-test");

        verify(bookService, times(1)).deleteBook("id-test");
        assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
        assertNull(response.getBody());
    }
}
