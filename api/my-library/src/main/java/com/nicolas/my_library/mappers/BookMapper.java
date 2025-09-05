package com.nicolas.my_library.mappers;

import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.dto.BookDTO;
import com.nicolas.my_library.entities.Author;
import com.nicolas.my_library.entities.Book;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class BookMapper {
    public static BookDTO toDTO(Book book) {
        final BookDTO dto = new BookDTO();

        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setSummary(book.getSummary());
        dto.setNbPages(book.getNbPages());
        dto.setPublishDate(book.getPublishDate());

        final List<AuthorDTO> authorDTOs = book.getAuthors().stream()
                .map(AuthorMapper::authorToDTO)
                .toList();
        dto.setAuthors(authorDTOs);

        return dto;
    }

    public static Book toEntity(BookDTO dto) {
        final Book book = new Book();

        book.setId(dto.getId());
        book.setTitle(dto.getTitle());
        book.setSummary(dto.getSummary());
        book.setNbPages(dto.getNbPages());
        book.setPublishDate(dto.getPublishDate());

        final List<Author> authors = dto.getAuthors().stream()
                .map(a -> AuthorMapper.authorToEntity(a, book))
                .toList();
        book.setAuthors(authors);

        return book;
    }
}
