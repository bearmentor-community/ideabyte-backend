# Idea Byte Backend with Node.js, Express, and MongoDB

## Setup

Run the `create-env.sh` script first, to copy `.env.schema` into `.env`.

```sh
./create-env.sh
```

Then you fill the env variables. Remember to install and make sure MongoDB is running on your machine.

```txt
# change these
DB_URL=mongodb://localhost:27017
DB_NAME=ideabyte
SECRET=this_is_your_secret
```

## Development

```sh
yarn start
```

Then open `http://localhost:8000`.

## Deploying

You can use Heroku or Google Cloud Platform to deploy. Remember to change the environment variables as well.

```txt
DB_URL=
DB_NAME=
SECRET=
```

## Project Development Steps

```sh
mkdir projectname-backend
cd projectname-backend

npm init -y
```

## License

MIT License
