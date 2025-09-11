package com.nicolas.my_library.exceptions;

public class AuthorNotFoundException extends RuntimeException {
    public AuthorNotFoundException(String id) {
        super("Author with ID '" + id + "' not found.");
    }
}
