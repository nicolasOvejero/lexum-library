package com.nicolas.my_library.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "author")
@Getter
@Setter
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String firstname;

    private String lastname;

    @ManyToMany(mappedBy = "authors")
    private List<Book> books;
}
