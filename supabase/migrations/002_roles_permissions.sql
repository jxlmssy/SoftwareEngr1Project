CREATE TABLE role (...);

CREATE TABLE module (...);

CREATE TABLE rights_catalogue (...);

CREATE TABLE user_permission (...);

ALTER TABLE app_users
ADD COLUMN is_blocked BOOLEAN DEFAULT FALSE;

ALTER TABLE app_users
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;