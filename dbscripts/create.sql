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

CREATE TABLE songs {
    song_id integer not null,
    name varchar(128) not null,
    band_id not null
}

CREATE TABLE tabs {
    tab_id bigserial primary key,
    song_id integer not null,
    part varchar(128) not null
}

CREATE TABLE tab_notes {
    tab_id integer not null,
    bar_id integer not null,
    position integer not null,
    fret integer not null,
    articulation integer not null,
}

-- CREATE TABLE artist {
    
-- }

CREATE TABLE bands {
    band_id serial primary key,
    name varchar(128)
}

-- CREATE TABLE parts {
    
-- }