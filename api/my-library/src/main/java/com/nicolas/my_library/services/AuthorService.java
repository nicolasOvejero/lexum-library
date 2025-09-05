package com.nicolas.my_library.services;

import com.nicolas.my_library.dto.AuthorDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AuthorService {
    public List<AuthorDTO> getAuthors(String bookId) {
        final List<AuthorDTO> authorDTOList = new ArrayList<>();

        authorDTOList.add(new AuthorDTO("id", "firstName", "lastName"));

        return authorDTOList;
    }
}
