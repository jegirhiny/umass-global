-- ### **Part Three: Soccer League**
-- Design a schema for a simple sports league. Your schema should keep track of
-- - All of the teams in the league
-- - All of the goals scored by every player for each game
-- - All of the players in the league and their corresponding teams
-- - All of the referees who have been part of each game
-- - All of the matches played between teams
-- - All of the start and end dates for season that a league has
-- - The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).

DROP DATABASE IF EXISTS soccer_league;

CREATE DATABASE soccer_league;

\c soccer_league

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name TEXT
);

CREATE TABLE players (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    team_id INT,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);

CREATE TABLE referees (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    last_name TEXT
);

CREATE TABLE matches (
    name TEXT,
    home_team INT,
    away_team INT,
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (home_team) REFERENCES teams(id),
    FOREIGN KEY (away_team) REFERENCES teams(id)
);


CREATE TABLE goals (
    num_goals INT,
    player_id INT,
    FOREIGN KEY (player_id) REFERENCES players(id)
);

CREATE TABLE standings (
    team_id INT,
    matches_played INT,
    wins INT,
    draws INT,
    losses INT,
    goals_for INT,
    goals_against INT,
    FOREIGN KEY (team_id) REFERENCES teams(id)
);