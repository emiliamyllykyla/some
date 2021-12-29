<p align="center">
 <img alt="Some" height="400px" src="https://user-images.githubusercontent.com/63544185/154061915-ef4ec3cf-01f4-44eb-96e0-abc022c19d5d.png"/>
</p>

<h1 align="center">SO|ME</h1>

Fullstack blog app!

* User authentication, register, login, logout
* Make posts, edit and delete
* Follow / unfollow

## Technologies

* [Express](https://expressjs.com/)
* [Redis](https://redis.io/) as the primary database
  * [Node-Redis](https://github.com/redis/node-redis)
  * Store users using hashes
  * Store posts using [RedisJSON](https://oss.redis.com/redisjson/)
  
* [JSON Web Token](https://jwt.io/) authentication 
  * Access & refresh tokens
  * [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
  
* [React](https://reactjs.org/) frontend 
  * [Create React App](https://github.com/facebook/create-react-app)


## Run the project

### Redis
* Install [Docker](https://www.docker.com/)

You'll only need to run these commands once:
* Run the [RedisJSON Docker image](https://hub.docker.com/r/redislabs/rejson/):

  `docker run -p 6379:6379 --name redis-redisjson redislabs/rejson:latest`

* Create search indices - in the project directory, run 

  `node create-redis-indices.js`


### Server
In the project directory, run `npm start`

### Client
In the `client` directory, run `npm run start`

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.
