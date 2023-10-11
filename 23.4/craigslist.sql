-- ### **Part Two: Craigslist**
-- Design a schema for Craigslist! Your schema should keep track of the following
-- - The region of the craigslist post (San Francisco, Atlanta, Seattle, etc)
-- - Users and preferred region
-- - Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
-- - Categories that each post belongs to

DROP DATABASE IF EXISTS craigslist;

CREATE DATABASE craigslist;

\c craigslist

CREATE TABLE users {
    id SERIAL PRIMARY KEY,
    user_name TEXT
}

CREATE TABLE regions {
    id SERIAL PRIMARY KEY,
    name TEXT
}

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT,
    description TEXT,
    user_id INT,
    location TEXT,
    region_id INT,
    FOREIGN KEY (region_id) REFERENCES regions(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    post_id INT,
    name TEXT,
    FOREIGN KEY (post_id) REFERENCES post(id)
);