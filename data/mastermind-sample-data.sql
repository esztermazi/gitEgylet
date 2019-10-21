ALTER TABLE IF EXISTS public.scores DROP CONSTRAINT IF EXISTS fk_user_id CASCADE;
ALTER TABLE IF EXISTS public.users DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
ALTER TABLE IF EXISTS public.scores DROP CONSTRAINT IF EXISTS pk_scores_id CASCADE;


DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP SEQUENCE IF EXISTS public.scores_id_seq;


DROP TABLE IF EXISTS public.scores;
DROP TABLE IF EXISTS public.users;



CREATE TABLE users (
    id serial NOT NULL,
    user_name text,
    user_password text,
    salt text,
    registration_date timestamp without time zone
);


CREATE TABLE scores (
    id serial NOT NULL,
    user_id integer,
    score integer
);


ALTER TABLE ONLY users
ADD CONSTRAINT pk_users_id PRIMARY KEY (id);


ALTER TABLE ONLY scores
ADD CONSTRAINT pk_scores_id PRIMARY KEY (id);


ALTER TABLE ONLY scores
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);
