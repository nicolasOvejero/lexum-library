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
                        "Can you find for the book \"" + title + "\" official summary " +
                                "and all authors in object firstname (named firstname) and lastname (named lastname). " +
                                "Everything in json format. Return just the json",
                        null
                );

        final String textJson = response.text()
                .replace("```", "")
                .replace("json", "");

        final Gson gson = new Gson();

        return gson.fromJson(textJson, AiResponse.class);
    }
}
