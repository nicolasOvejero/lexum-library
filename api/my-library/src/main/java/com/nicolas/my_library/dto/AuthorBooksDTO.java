package com.nicolas.my_library.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthorBooksDTO {
    private String id;
    private String firstname;
    private String lastname;
    private List<BookDTO> books;
}
