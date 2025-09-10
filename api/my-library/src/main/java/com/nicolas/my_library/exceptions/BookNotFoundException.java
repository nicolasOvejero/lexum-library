package com.nicolas.my_library.exceptions;

public class BookNotFoundException extends RuntimeException {
    public BookNotFoundException(String id) {
        super("Book with ID '" + id + "' not found.");
    }
}
