package com.nicolas.my_library.mappers;

import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.entities.Author;
import com.nicolas.my_library.entities.Book;

public class AuthorMapper {
    public static AuthorDTO authorToDTO(Author author) {
        final AuthorDTO dto = new AuthorDTO();

        dto.setId(author.getId());
        dto.setFirstname(author.getFirstname());
        dto.setLastname(author.getLastname());

        return dto;
    }

    public static Author authorToEntity(AuthorDTO dto, Book book) {
        final Author author = new Author();

        author.setId(dto.getId());
        author.setFirstname(dto.getFirstname());
        author.setLastname(dto.getLastname());
        author.setBook(book);

        return author;
    }
}
