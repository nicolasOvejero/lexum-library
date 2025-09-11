package com.nicolas.my_library.controllers;

import com.nicolas.my_library.dto.BookDTO;
import com.nicolas.my_library.exceptions.BookNotFoundException;
import com.nicolas.my_library.exceptions.InvalidParamsException;
import com.nicolas.my_library.services.BookService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping(value = "/books")
    public List<BookDTO> getBooks() {
        return this.bookService.getBooks();
    }

    @GetMapping(value = "/books/{id}")
    public BookDTO getBook(@PathVariable String id) {
        if (id == null || id.isBlank()) {
            throw new InvalidParamsException();
        }

        return this.bookService.getBookById(id);
    }

    @PostMapping(value = "/books")
    public BookDTO createBook(@Validated @RequestBody BookDTO book) {
        return this.bookService.createBook(book);
    }

    @PutMapping(value = "/books/{id}")
    public BookDTO updateBook(@PathVariable String id, @Validated @RequestBody BookDTO book) {
        if (id == null || id.isBlank()) {
            throw new InvalidParamsException();
        }

        return this.bookService.updateBook(id, book);
    }

    @DeleteMapping(value = "/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        if (id == null || id.isBlank()) {
            throw new InvalidParamsException();
        }

        this.bookService.deleteBook(id);

        return ResponseEntity.noContent().build();
    }
}
