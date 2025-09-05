package com.nicolas.my_library.dto;

import java.util.Date;
import java.util.List;

import lombok.*;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookDTO {
    private String id;

    @NotNull
    @Size(min = 1, max = 255)
    private String title;

    @NotNull
    @Size(min = 1)
    private List<AuthorDTO> authors;

    @NotNull
    private Date publishDate;

    @NotNull
    private String summary;

    @NotNull
    private Integer nbPages;
}
