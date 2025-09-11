package com.nicolas.my_library.services;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import com.google.gson.Gson;
import com.nicolas.my_library.dto.AiResponse;
import org.springframework.stereotype.Service;

@Service
public class AiService {
    Client client = Client.builder().apiKey("AIzaSyAv9hgnGZA_FQPhBjblGT-hXVQeYgIHLlM").build();

    public AiResponse findSummary(String title) {
        final GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        "Can you find me the official summary of the book : \"" + title + "\" and the publication date with name publicationDate and the number of pages with name numberOfPages and all authors in object firstname (named firstName) and lastname (named lastName). Everything in json format. Return just the json",
                        null
                );

        System.out.println("Can you find me the official summary of the book : \"" + title + "\" and the publication date with name publicationDate and the number of pages with name numberOfPages and all authors in object firstname (named firstName) and lastname (named lastName). Everything in json format. Return just the json");
        final String textJson = response.text()
                .replace("```", "")
                .replace("json", "");

        final Gson gson = new Gson();

        return gson.fromJson(textJson, AiResponse.class);
    }
}
