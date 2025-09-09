package com.nicolas.my_library.services;

import com.nicolas.my_library.dto.BookDTO;
import com.nicolas.my_library.entities.Author;
import com.nicolas.my_library.entities.Book;
import com.nicolas.my_library.exceptions.BookNotFoundException;
import com.nicolas.my_library.mappers.AuthorMapper;
import com.nicolas.my_library.mappers.BookMapper;
import com.nicolas.my_library.repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookService {
   private final BookRepository bookRepository;

    public BookService(
        BookRepository bookRepository
    ) {
        this.bookRepository = bookRepository;
    }

    public List<BookDTO> getBooks() {
        final List<Book> booksInDb = bookRepository.findAll();
        System.out.println(booksInDb.get(0).toString());

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
        final Book bookInDb = bookRepository.save(BookMapper.toEntity(book));

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

        final List<Author> authors = book.getAuthors()
                .stream()
                .map((author) -> AuthorMapper.authorToEntity(author, bookInDb))
                .collect(Collectors.toCollection(ArrayList::new));

        bookInDb.getAuthors().clear();
        bookInDb.getAuthors().addAll(authors);

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
