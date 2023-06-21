# NODE.JS - EXPRESS API

### RESUME
Our mobile application first ask user to register. Once logged, the user can create a channel and chat with other users. The user is also allowed to send private message to another one user.  
<br/>

### STACK
```
Main : Node.js, Express, Sequelize, Socket.io, JsonWebToken
Utils : Bcrypt, CORS, Dotenv, Nodemon
Unit Test : Jest
``` 
<br/>

### LAUNCH
```
> cd api
> npm install
> npm start (no check changes)
> npm run dev (check changes)
```
<br/>

### LAUNCH TESTS
```
> cd api
> npm run test
```
<br/>

### FOLDER ORGANISATION
- api >
  - src >
    - jwt > 
      - authJwt.js : contains methods to generate / verify token  
    - middlewares >
      - authMiddleware.js : contains method to check user credentials (token)
      - roleMiddleware.js : contains method to check user role (user, admin, ...)
      - securityMiddleware.js : contains method who return a value, used to control if user get autorizations to act on specifics endpoints  
    - models >
      - channel.model.js : Channel entity
      - channelMessage.model.js : Channel Message entity
      - conversationMessage.model.js : Conversation Message entity
      - index.js : contains Sequelize config and Entity associations (OneToOne, ManyToOne, OneToMany, ManyToMany)
      - user.model.js : User entity
      - userChannel.model.js : User Channel entity
      - userConversation.model.js : User Conversation entity  
    - router >
      - channelMessageRouter.js : contains endpoints related to Channel Message Entity
      - channelRouter.js : contains endpoints related to Channel Entity
      - conversationMessageRouter.js : contains endpoints related to User Conversation and Conversation Message Entities
      - conversationRouter.js : contains endpoints related to User Conversation and Conversation Entities
      - userRouter.js : contains endpoints related to User Entity  
    - services >
      - channelMessageServices.js : contains methods related to Channel Message Entity
      - channelServices.js : contains methods related to Channel Entity
      - conversationMessageServices.js : contains methods related to User Conversation and Conversation Message Entities
      - conversationServices.js : contains methods related to User Conversation and Conversation Entities
      - userServices.js : contains methods related to User Entity   
    - socket >
      - index.js : contains all live socket methods
    - tests >
      - channel.test.js : contains unit tests for channel entity
      - channelMessage.test.js : contains unit tests for channelMessage entity
      - conversation.test.js : contains unit tests for conversation entity
      - conversationMessage.test.js : contains unit tests for conversationMessage entity
      - unauthorized.test.js : contains unit tests for exception (JWT, user ID)
      - user.test.js : contains unit tests for user entity
    - config.js : DB informations
    - index.js : express API
