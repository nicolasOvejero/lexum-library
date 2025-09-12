CREATE TABLE IF NOT EXISTS book (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255),
    publish_date DATE,
    summary TEXT,
    nb_pages INT
) CHARACTER SET = utf8mb4;

CREATE TABLE IF NOT EXISTS author (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    firstname VARCHAR(255),
    lastname VARCHAR(255),
    book_id  VARCHAR(36),
    FOREIGN KEY (book_id) REFERENCES book(id)
);

SET @book1_id = UUID();
SET @book2_id = UUID();

INSERT INTO book (id, title, publish_date, summary, nb_pages)
VALUES
    (@book1_id, "Mon super livre", CURDATE(), "Ceci est un super livre avec des mots et meme des lettres", 1),
    (@book2_id, "Mon super livre 2", CURDATE(), "Ceci est un super livre avec des mots et même des lettres et aussi des chiffres", 2);


INSERT INTO author (id, firstname, lastname, book_id)
VALUES
    (UUID(), "Jean", "Dupont", @book1_id),
    (UUID(), "Alice", "Martin", @book1_id),
    (UUID(), "Marc", "Durand", @book2_id);

SELECT * FROM book;
describe book;
SELECT * FROM author;
describe author;
