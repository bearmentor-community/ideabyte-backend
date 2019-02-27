# API Documentation

## Users

| Endpoint          | Method | Description           | isAuthenticated | isAdmin |
| ----------------- | ------ | --------------------- | --------------- | ------- |
| `/`               | GET    | Hello                 |                 |         |
| `/users/register` | POST   | Register new user     |                 |         |
| `/users/login`    | POST   | Login to user         |                 |         |
| `/users/profile`  | GET    | Get user profile      | YES             |         |
| `/users/:id`      | GET    | Get one user by id    |                 |         |
| `/users`          | GET    | Get all users         |                 |         |
| `/users`          | DELETE | Delete all users      |                 | YES     |
| `/users/:id`      | DELETE | Delete one user by id | YES             |         |
| `/users/:id`      | PUT    | Update one user by id |                 |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "name": "Joen Doe",
  "email": "joendoe@example.com",
  "salt": "zyxwvutsrqp",
  "password": "zyxwvutsrqpabcdefghijklmnopqrstuvwxyz",
  "__v": 0
}
```

## Ideas

| Endpoint           | Method | Description           | isAuthenticated | isAdmin |
| ------------------ | ------ | --------------------- | --------------- | ------- |
| `/ideas`           | GET    | Get all ideas         |                 |         |
| `/ideas?q=keyword` | GET    | Search for ideas      |                 |         |
| `/ideas`           | POST   | Create new idea       | YES             |         |
| `/ideas`           | DELETE | Delete all ideas      |                 | YES     |
| `/ideas/:id`       | DELETE | Delete one idea by id | YES             |         |
| `/ideas/:id`       | PUT    | Update one idea by id | YES             |         |

Example Data:

```json
{
  "_id": ObjectID(),
  "id": 1,
  "title": "Tripvesto Trip Planner",
  "description": "App to plan and gather your friends to travel. Let's join us!",
  "author": "Joen Doe",
  "date": "2019/02/25",
  "location": "Jakarta, Indonesia",
  "slug": "tripvesto-trip-planner",
  "images": [
    "/assets/images/picture.jpg",
    "/assets/images/picture.jpg",
    "/assets/images/picture.jpg"
  ],
  "details": "<p>Details here</p>"
}
```
