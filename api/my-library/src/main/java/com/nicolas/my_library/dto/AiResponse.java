package com.nicolas.my_library.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class AiResponse {
    String summary;
    List<AuthorDTO> authors;
}

