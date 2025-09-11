package com.nicolas.my_library.mappers;

import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.entities.Author;

public class AuthorMapper {
    public static AuthorDTO authorToDTO(Author author) {
        final AuthorDTO dto = new AuthorDTO();

        dto.setId(author.getId());
        dto.setFirstname(author.getFirstname());
        dto.setLastname(author.getLastname());

        return dto;
    }
}
