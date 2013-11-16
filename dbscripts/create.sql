CREATE TABLE users (
    user_id bigserial primary key,
    username varchar(64) NOT NULL,
    password varchar(64) NOT NULL,
    date_created timestamp default now()
);

CREATE TABLE resources (
    resource_id bigserial primary key,
    title varchar(64) NOT NULL,
    url varchar(1024) NOT NULL,
    date_created timestamp default now(),
    CONSTRAINT unique_url UNIQUE (url)
);

CREATE TABLE tags (
	tag_id bigserial primary key,
    tag varchar(64) NOT NULL	
);

CREATE TABLE resource_tags (
	tag_id integer not null,
	resource_id integer not null,
	primary key(tag_id, resource_id)
)