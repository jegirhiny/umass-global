process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testBook;

beforeAll(async () => {
  await db.query(`
      CREATE TABLE books (
        isbn TEXT PRIMARY KEY,
        amazon_url TEXT,
        author TEXT,
        language TEXT,
        pages INTEGER,
        publisher TEXT,
        title TEXT,
        year INTEGER
      )`);

  const result = await db.query(
    `INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
    [
      "12345",
      "http://a.co/eobPtX2",
      "Test Author",
      "English",
      300,
      "Test Publisher",
      "Test Book",
      2020,
    ]
  );

  testBook = result.rows[0];
});

afterAll(async () => {
  await db.query("DROP TABLE books");
  await db.end();
});

describe("POST /books", () => {
  const newBook = {
    book: {
      isbn: "1-234-5",
      amazon_url: "http://amazon.com/a-book",
      author: "Jake",
      language: "English",
      pages: 500,
      publisher: "Publisher",
      title: "Title",
      year: 2024,
    },
  };

  test("Creates a new book with valid data", async () => {
    const response = await request(app).post("/books").send(newBook);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual(newBook);
  });

  test("Prevents creating book without required title", async () => {
    const { title, ...invalidBook } = newBook;
    const response = await request(app)
      .post("/books")
      .send({ book: invalidBook });

    expect(response.statusCode).toBe(400);
  });

  test("Prevents creating book with invalid data type", async () => {
    const response = await request(app)
      .post("/books")
      .send({ book: { ...newBook, pages: "three hundred fifty" } });

    expect(response.statusCode).toBe(400);
  });
});

describe("PUT /books/:isbn", () => {
  const updatedBook = {
    book: {
      isbn: "12345",
      amazon_url: "http://amazon.com/some-book-updated",
      author: "Jane Doe",
      language: "Spanish",
      pages: 400,
      publisher: "Random House",
      title: "The Updated Adventure",
      year: 2023,
    },
  };

  test("Updates a book with valid data", async () => {
    const response = await request(app).put(`/books/${testBook.isbn}`).send(updatedBook);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(updatedBook);
  });

  test("Prevents updating book with invalid data type", async () => {
    const response = await request(app).put(`/books/${testBook.isbn}`).send({ book: { ...updatedBook, pages: "four hundred" } });

    expect(response.statusCode).toBe(400);
  });
});
