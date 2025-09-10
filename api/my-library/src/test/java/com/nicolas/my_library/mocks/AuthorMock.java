package com.nicolas.my_library.mocks;

import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.entities.Author;

public class AuthorMock {
    public static AuthorDTO getAuthor1() {
        final AuthorDTO author = new AuthorDTO();

        author.setId("id-test-1");
        author.setFirstname("firstname-test");
        author.setLastname("lastname-test");

        return author;
    }

    public static AuthorDTO getAuthor2() {
        final AuthorDTO author = new AuthorDTO();

        author.setId("id-test-2");
        author.setFirstname("firstname-test-2");
        author.setLastname("lastname-test-2");

        return author;
    }


    public static AuthorDTO getAuthor3() {
        final AuthorDTO author = new AuthorDTO();

        author.setId("id-test-3");
        author.setFirstname("firstname-test-3");
        author.setLastname("lastname-test-3");

        return author;
    }

    public static Author getAuthorEntity1() {
        final Author author = new Author();

        author.setId("id-test-1");
        author.setFirstname("firstname-test");
        author.setLastname("lastname-test");

        return author;
    }

    public static Author getAuthorEntity2() {
        final Author author = new Author();

        author.setId("id-test-2");
        author.setFirstname("firstname-test-2");
        author.setLastname("lastname-test-2");

        return author;
    }


    public static Author getAuthorEntity3() {
        final Author author = new Author();

        author.setId("id-test-3");
        author.setFirstname("firstname-test-3");
        author.setLastname("lastname-test-3");

        return author;
    }}
