CREATE TABLE users (
    user_id bigserial primary key,
    username varchar(64) NOT NULL,
    password varchar(64) NOT NULL,
    date_created timestamp default now()
);