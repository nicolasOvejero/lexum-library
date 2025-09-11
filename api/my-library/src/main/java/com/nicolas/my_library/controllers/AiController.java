package com.nicolas.my_library.controllers;

import com.nicolas.my_library.dto.AiResponse;
import com.nicolas.my_library.exceptions.InvalidParamsException;
import com.nicolas.my_library.services.AiService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {
    final AiService aiService;

    AiController(
            final AiService aiService
    ) {
        this.aiService = aiService;
    }

    @PostMapping(value = "/ai/book/summary")
    public AiResponse getBookSummary(@RequestBody String title) {
        if (title == null || title.isBlank()) {
            throw new InvalidParamsException();
        }

        return this.aiService.findSummary(title);
    }
}
