<img src="https://i.imgur.com/sIaXROA.png"/>

## Clippy Back-end

Clippy is a web application designed to simplify the management of online courses. With Clippy, instructors can easily manage coursework, give feedback to students, take attendance, grade deliverables, and track student progress. Students can join cohorts, submit homework, receive feedback, and view their standing in the course. Auth0 is used for user authentication and authorization.

> Please note, this backend server for Clippy. To run the client app, please visit the [clippy-front-end](https://github.com/whlong1/clippy-front-end) for instructions.

## Getting Started

To run the Clippy Back-end on your local machine, follow these steps:

1. Clone this repository:

```
git clone https://github.com/[username]/clippy-back-end.git
```

2. Navigate to the project directory:

```
cd clippy-back-end
```

3. Install the required dependencies:

```
npm install
```

4. Create a .env file in the root directory with the following variables:

```
AUTH0_DOMAIN=[Auth0 Domain]
CLIENT_ID=[Auth0 Client Id]
AUTH0_AUDIENCE=[Auth0 Audience]
CLIENT_SECRET=[Auth0 Client Secret]
CLIENT_ORIGIN_URL=http://localhost:3000
DATABASE_URL=[MongoDB Connection String]
```

5. Start the development server:

```
nodemon
```