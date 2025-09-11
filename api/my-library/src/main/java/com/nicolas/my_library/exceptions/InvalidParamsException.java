package com.nicolas.my_library.exceptions;

public class InvalidParamsException extends RuntimeException {
    public InvalidParamsException() {
        super("The parameter given are wrong.");
    }
}
