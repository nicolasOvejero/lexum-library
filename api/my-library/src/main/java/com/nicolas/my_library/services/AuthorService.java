package com.nicolas.my_library.services;

import com.nicolas.my_library.dto.AuthorBooksDTO;
import com.nicolas.my_library.dto.AuthorDTO;
import com.nicolas.my_library.entities.Author;
import com.nicolas.my_library.exceptions.AuthorNotFoundException;
import com.nicolas.my_library.mappers.AuthorMapper;
import com.nicolas.my_library.repositories.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthorService {
    private final AuthorRepository authorRepository;

    public AuthorService(
            final AuthorRepository authorRepository
    ) {
        this.authorRepository = authorRepository;
    }

    public List<AuthorDTO> getAuthors() {
        final List<Author> booksInDb = authorRepository.findAll();

        return booksInDb
                .stream()
                .map(AuthorMapper::authorToDTO)
                .toList();
    }

    public Author getAuthor(AuthorDTO dto) {
        if (dto.getId() != null) {
            return authorRepository.findById(dto.getId())
                    .orElseThrow(() -> new AuthorNotFoundException(dto.getId()));
        } else {
            final Author author = new Author();

            author.setFirstname(dto.getFirstname());
            author.setLastname(dto.getLastname());

            return author;
        }
    }

    public AuthorBooksDTO getAuthorWithBooks(final String id) {
         final Author author = authorRepository.findByIdWithBooks(id)
                .orElseThrow(() -> new AuthorNotFoundException(id));

        return AuthorMapper.authorBooksToDTO(author);
    }
}
