package com.nicolas.my_library.services;

import com.nicolas.my_library.dto.BookDTO;
import com.nicolas.my_library.entities.Author;
import com.nicolas.my_library.entities.Book;
import com.nicolas.my_library.exceptions.BookNotFoundException;
import com.nicolas.my_library.mocks.AuthorMock;
import com.nicolas.my_library.mocks.BookMock;
import com.nicolas.my_library.repositories.BookRepository;
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
public class BookServiceTest {
    @MockitoBean
    private BookRepository bookRepository;

    @MockitoBean
    private AuthorService authorService;

    @Test
    void testGetBooks() {
        final BookService bookService = new BookService(bookRepository, authorService);

        final List<Book> bookEntities = new ArrayList<>();
        bookEntities.add(BookMock.getBookEntityWithAuthor());

        final Book book2Entities = BookMock.getBookEntity2();
        book2Entities.setAuthors(new ArrayList<>());
        book2Entities.getAuthors().add(AuthorMock.getAuthorEntity2());
        bookEntities.add(book2Entities);

        when(bookRepository.findAll()).thenReturn(bookEntities);

        final List<BookDTO> booksFound = bookService.getBooks();

        verify(bookRepository, times(1)).findAll();
        assertEquals(2,  booksFound.size());

        assertEquals(BookMock.getBookDTO1().getId(), booksFound.getFirst().getId());
        assertEquals(BookMock.getBookDTO2().getId(), booksFound.get(1).getId());
    }

    @Test
    void testGetBook() {
        final BookService bookService = new BookService(bookRepository, authorService);
        final String bookId = BookMock.getBookEntity1().getId();

        when(bookRepository.findById(bookId)).thenReturn(Optional.of(BookMock.getBookEntityWithAuthor()));

        final BookDTO booksFound = bookService.getBookById(bookId);

        verify(bookRepository, times(1)).findById(bookId);
        assertEquals(bookId, booksFound.getId());
    }

    @Test
    void testGetBookNotFound() {
        final BookService bookService = new BookService(bookRepository, authorService);
        final String bookId = BookMock.getBookEntity1().getId();

        when(bookRepository.findById(bookId)).thenReturn(Optional.empty());

        try {
            bookService.getBookById(bookId);
        } catch (BookNotFoundException e) {
            verify(bookRepository, times(1)).findById(bookId);
            assertEquals(e.getMessage(), "Book with ID '" + bookId + "' not found.");
        }
    }

    @Test
    void testCreatBook() {
        final BookService bookService = new BookService(bookRepository, authorService);
        final String bookId = BookMock.getBookEntity1().getId();

        when(bookRepository.save(any())).thenReturn(BookMock.getBookEntityWithAuthor());

        final Author author = AuthorMock.getAuthorEntity1();
        author.setId(null);
        when(authorService.getAuthor(BookMock.getBookDTOWithAuthor().getAuthors().getFirst())).thenReturn(author);

        final BookDTO resp = bookService.createBook(BookMock.getBookDTOWithAuthor());

        verify(bookRepository, times(1)).save(any());
        verify(authorService, times(1)).getAuthor(BookMock.getBookDTOWithAuthor().getAuthors().getFirst());
        assertEquals(bookId, resp.getId());
    }

    @Test
    void testUpdateBookNotFound() {
        final BookService bookService = new BookService(bookRepository, authorService);
        final String bookId = BookMock.getBookDTOWithAuthor().getId();

        when(bookRepository.findById(any())).thenReturn(Optional.empty());
        when(bookRepository.save(any())).thenReturn(BookMock.getBookEntityWithAuthor());

        try {
            bookService.updateBook(bookId, BookMock.getBookDTOWithAuthor());
        } catch (BookNotFoundException e) {
            verify(bookRepository, times(1)).findById(bookId);
            assertEquals(e.getMessage(), "Book with ID '" + bookId + "' not found.");
        }
    }

    @Test
    void testUpdateBook() {
        final BookService bookService = new BookService(bookRepository, authorService);
        final String bookId = BookMock.getBookDTOWithAuthor().getId();

        when(bookRepository.findById(any())).thenReturn(Optional.of(BookMock.getBookEntityWithAuthor()));
        when(bookRepository.save(any())).thenReturn(BookMock.getBookEntityWithAuthor());

        final Author author = AuthorMock.getAuthorEntity1();
        author.setId(null);
        when(authorService.getAuthor(BookMock.getBookDTOWithAuthor().getAuthors().getFirst())).thenReturn(author);

        final BookDTO resp = bookService.updateBook(bookId, BookMock.getBookDTOWithAuthor());

        verify(bookRepository, times(1)).save(any());
        verify(bookRepository, times(1)).findById(any());
        verify(authorService, times(1)).getAuthor(BookMock.getBookDTOWithAuthor().getAuthors().getFirst());
        assertEquals(bookId, resp.getId());
    }

    @Test
    void testDeleteBookNotFound() {
        final BookService bookService = new BookService(bookRepository, authorService);
        final String bookId = BookMock.getBookDTOWithAuthor().getId();

        when(bookRepository.findById(any())).thenReturn(Optional.empty());

        try {
            bookService.deleteBook(bookId);
        } catch (BookNotFoundException e) {
            verify(bookRepository, times(1)).findById(bookId);
            assertEquals(e.getMessage(), "Book with ID '" + bookId + "' not found.");
        }
    }

    @Test
    void testDeleteBook() {
        final BookService bookService = new BookService(bookRepository, authorService);
        final String bookId = BookMock.getBookDTOWithAuthor().getId();

        when(bookRepository.findById(any())).thenReturn(Optional.of(BookMock.getBookEntityWithAuthor()));

        bookService.deleteBook(bookId);

        verify(bookRepository, times(1)).findById(any());
        verify(bookRepository, times(1)).delete(any());
    }
}
