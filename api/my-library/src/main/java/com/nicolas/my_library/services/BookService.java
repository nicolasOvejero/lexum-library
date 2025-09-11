package com.nicolas.my_library.services;

import com.nicolas.my_library.dto.BookDTO;
import com.nicolas.my_library.entities.Author;
import com.nicolas.my_library.entities.Book;
import com.nicolas.my_library.exceptions.BookNotFoundException;
import com.nicolas.my_library.mappers.BookMapper;
import com.nicolas.my_library.repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorService authorService;

    public BookService(
        final BookRepository bookRepository,
        final AuthorService authorService
    ) {
        this.bookRepository = bookRepository;
        this.authorService = authorService;
    }

    public List<BookDTO> getBooks() {
        final List<Book> booksInDb = bookRepository.findAll();

        return booksInDb
                .stream()
                .map(BookMapper::toDTO)
                .toList();
    }

    public BookDTO getBookById(String id) {
        final Book bookInDb = bookRepository.findById(id).orElseThrow(
                () -> new BookNotFoundException(id)
        );

        return BookMapper.toDTO(bookInDb);
    }

    public BookDTO createBook(BookDTO book) {
        final Book bookEntity = BookMapper.toEntity(book);

        final List<Author> authors = book.getAuthors().stream()
                .map(this.authorService::getAuthor)
                .collect(Collectors.toList());
        bookEntity.setAuthors(authors);

        for (Author author : authors) {
            if (author.getBooks() == null) {
                author.setBooks(new ArrayList<>());
            }
            author.getBooks().add(bookEntity);
        }

        final Book bookInDb = bookRepository.save(bookEntity);

        return BookMapper.toDTO(bookInDb);
    }

    public BookDTO updateBook(String id, BookDTO book) {
        final Book bookInDb = bookRepository.findById(id).orElseThrow(
                () -> new BookNotFoundException(id)
        );

        bookInDb.setTitle(book.getTitle());
        bookInDb.setSummary(book.getSummary());
        bookInDb.setNb_pages(book.getNbPages());
        bookInDb.setPublishDate(book.getPublishDate());

        final List<Author> authors = book.getAuthors().stream()
                .map(this.authorService::getAuthor)
                .toList();

        final List<Author> currentAuthors = new ArrayList<>(bookInDb.getAuthors());
        for (Author author : currentAuthors) {
            if (!authors.contains(author)) {
                bookInDb.getAuthors().remove(author);
                author.getBooks().remove(bookInDb);
            }
        }

        for (Author author : authors) {
            if (!bookInDb.getAuthors().contains(author)) {
                bookInDb.getAuthors().add(author);
                author.getBooks().add(bookInDb); // lien inverse
            }
        }

        final Book bookSaved = bookRepository.save(bookInDb);

        return BookMapper.toDTO(bookSaved);
    }

    public void deleteBook(String id) {
        final Book bookInDb = bookRepository.findById(id).orElseThrow(
                () -> new BookNotFoundException(id)
        );

        bookRepository.delete(bookInDb);
    }
}
