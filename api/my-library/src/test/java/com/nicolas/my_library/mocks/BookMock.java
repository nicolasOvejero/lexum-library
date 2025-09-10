package com.nicolas.my_library.mocks;

import com.nicolas.my_library.dto.BookDTO;
import com.nicolas.my_library.entities.Book;

import java.util.ArrayList;
import java.util.Date;

public class BookMock {
    public static BookDTO getBookDTO1() {
        final BookDTO bookDTO = new BookDTO();

        bookDTO.setId("book-1");
        bookDTO.setTitle("title-test");
        bookDTO.setSummary("description-test");
        bookDTO.setNbPages(12);
        bookDTO.setPublishDate(new Date());

        return  bookDTO;
    }

    public static BookDTO getBookDTO2() {
        final BookDTO bookDTO = new BookDTO();

        bookDTO.setId("book-2");
        bookDTO.setTitle("title-test");
        bookDTO.setSummary("description-test");
        bookDTO.setNbPages(12);
        bookDTO.setPublishDate(new Date());

        return  bookDTO;
    }

    public static Book getBookEntity1() {
        final Book book = new Book();

        book.setId("book-1");
        book.setTitle("title-test");
        book.setSummary("description-test");
        book.setNb_pages(12);
        book.setPublishDate(new Date());

        return  book;
    }

    public static Book getBookEntity2() {
        final Book book = new Book();

        book.setId("book-2");
        book.setTitle("title-test");
        book.setSummary("description-test");
        book.setNb_pages(12);
        book.setPublishDate(new Date());

        return  book;
    }

    public static Book getBookEntityWithAuthor() {
        final Book book1Entities = BookMock.getBookEntity1();

        book1Entities.setAuthors(new ArrayList<>());
        book1Entities.getAuthors().add(AuthorMock.getAuthorEntity1());

        return book1Entities;
    }

    public static BookDTO getBookDTOWithAuthor() {
        final BookDTO book = BookMock.getBookDTO1();

        book.setAuthors(new ArrayList<>());
        book.getAuthors().add(AuthorMock.getAuthor1());

        return book;
    }
}
