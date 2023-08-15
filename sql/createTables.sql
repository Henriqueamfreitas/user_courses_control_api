-- Creating the tables
    CREATE TABLE IF NOT EXISTS users(
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(50) UNIQUE NOT NULL,
        "password" VARCHAR(120) NOT NULL,
        "admin" BOOLEAN NOT NULL DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS courses(
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(15) NOT NULL,
        "description" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS userCourses(
        "id" SERIAL PRIMARY KEY,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "userId" INTEGER NOT NULL,
        "courseId" INTEGER NOT NULL,
        CONSTRAINT "fk_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_course" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE
    );

-- Inserting values into the tables
    INSERT INTO users("name", "email", "password", "admin")
    VALUES ('teste3', 'teste3@mail.com', '12345', false)
    RETURNING "users"."id", "users"."name", "users"."email", "users"."admin";

    INSERT INTO courses("name", "description")
    VALUES ('teste3', 'teste3description')
    RETURNING *;

-- Getting values from the table
    SELECT * FROM users;

    SELECT * FROM courses;

    SELECT * FROM userCourses;

-- Reseting Tables
    DROP TABLE userCourses;
    DROP TABLE courses;
    DROP TABLE users;
        CREATE TABLE IF NOT EXISTS users(
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(50) NOT NULL,
        "email" VARCHAR(50) UNIQUE NOT NULL,
        "password" VARCHAR(120) NOT NULL,
        "admin" BOOLEAN NOT NULL DEFAULT false
    );

    CREATE TABLE IF NOT EXISTS courses(
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(15) NOT NULL,
        "description" TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS userCourses(
        "id" SERIAL PRIMARY KEY,
        "active" BOOLEAN NOT NULL DEFAULT true,
        "userId" INTEGER NOT NULL,
        "courseId" INTEGER NOT NULL,
        CONSTRAINT "fk_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "fk_course" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE
    );
