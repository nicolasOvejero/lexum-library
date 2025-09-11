package com.nicolas.my_library.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AiResponse {
    String title;
    String summary;
    String publicationDate;
    String numberOfPages;
    List<AiAuthors> authors;
}

