package com.nicolas.my_library.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AuthorDTO {
    private String id;
    private String firstname;
    private String lastname;
}
