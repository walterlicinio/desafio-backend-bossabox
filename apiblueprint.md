FORMAT: 1A

# VUTTR

The VUTTR API (Very Useful Tools to Remember) is a repository for useful tools for developers, with the name, link, description and tags for each of these tools.

# Group Tools

The following commands are the main use of the API, allowing you to fetch, add and delete tools in the database.

## Tools [/tools]

### List all Tools [GET]

- Response (application/json)

      [{
          "title": "Notion",
          "link": "https://notion.so",
          "description": "All in one tool to organize teams and ideas. Write, plan, collaborate, and get organized. ",
          "tags": [
            "organization",
            "planning",
            "collaboration",
            "writing",
            "calendar"
          ],
          "id": 1
        },
        {
          "title": "json-server",
          "link": "https://github.com/typicode/json-server",
          "description": "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
          "tags": [
            "api",
            "json",
            "schema",
            "node",
            "github",
            "rest"
          ],
          "id": 2
        },
        {
          "title": "fastify",
          "link": "https://www.fastify.io/",
          "description": "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
          "tags": [
            "web",
            "framework",
            "node",
            "http2",
            "https",
            "localhost"
          ],
          "id": 3
      }]

### Store a new Tool [POST]

Use this route to add new tools to the API. It takes a JSON object with title(String), link(String), description(String), and tags(Array of Strings) and stores it in the tools database. You must be authenticated (with JSON Web Token provided by POST/login) for it to work.

- Headers
  JSON Web Token must be sent as Bearer token (accquired in POST/login)

- Request (application/json)

      {
        "title" : "New Application",
        "link" : "newapplication.com",
        "description" : "An example application",
        "tags" : ["node","http","localhost","planning"]
      }

- Response (application/json)

      {
        "title": "New Application",
        "link": "newapplication.com",
        "description": "An example application",
        "tags": [
        "node",
        "http",
        "localhost",
        "planning"
        ],
        "id": 4
      }

## Fetch Tools by Tag [/tools?tag={search tag}]

- Parameters
  - search tag - Term you'll use to fetch all tools that contain this specific tag.

### Fetch Tools by Tag [GET]

For example, if searchTag = node (route '/tools?tag=node'), the response will be:

- Response 200 (application/json)

      [
      {
        "title": "json-server",
        "link": "https://github.com/typicode/json-server",
        "description": "Fake REST API based on a json schema. Useful for mocking and creating APIs for front-end devs to consume in coding challenges.",
        "tags": [
          "api",
          "json",
          "schema",
          "node",
          "github",
          "rest"
        ],
        "id": 2
      },
      {
        "title": "fastify",
        "link": "https://www.fastify.io/",
        "description": "Extremely fast and simple, low-overhead web framework for NodeJS. Supports HTTP2.",
        "tags": [
          "web",
          "framework",
          "node",
          "http2",
          "https",
          "localhost"
        ],
        "id": 3
        }
      ]

## Deleting Tool [/tools/{id}]

### Delete Tool by id [DELETE]

You can delete a tool from the database providing a single id.

- Response 200 (application/json)

      {}

# Group User

## User [/user]

### Store a New User [STORE]

Provide a username, an email and a password to create a new user, to be used in the authentication process. The response will be a JSON object with the password hash (encrypted with BcryptJS). Example:

- Request (application/json)

      {
        "username" : "Testname",
        "email" : "test@email.com",
        "password" : "testpass"
      }

- Response 200 (application/json)

      {
        "_id": "5d1e2adb4bbce23edd5304e9",
        "username": "Testname",
        "email": "test@email.com",
        "password": "$2a$08$Xxz12R/bTElAMwk4RF1btuFSR89WDjfHxUqhZCHR1ty6ulk7Xx8oO",
        "__v": 0
      }

### Delete a User [DELETE]

Provide an email and password to delete your user. Must be authenticated in a session for it to work (use the token provided by Session Login).

- Headers
  JSON Web Token must be sent as Bearer token (accquired in POST/login)

- Request (application/json)

      {
        "email":"test@email.com,
        "password":"testpass"
      }

- Response 200 (application/json)

      {
        "deleted": "Testname"
      }

# Group Session Login

## Session Login [/login]

### Store a new JSON Web Token [POST]

Posting an email and a password as a JSON object, you can get the user object with the JSON Web Token (jwt) to authenticate the user.

- Request (application/json)

      {
        "email" : "test@email.com",
        "password" : "testpass"
      }

- Reponse 200 (application/json)

      {
        "user": {
          "_id": "5d1e2b6f4bbce23edd5304ea",
          "username": "Testname",
          "email": "test@email.com",
          "password": "$2a$08$8busrduKtrQzuDDbupw4q.D40fDPlFkMo/ng3U/b1BXNAvTq0oNOe",
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMWUyYjZmNGJiY2UyM2VkZDUzMDRlYSIsImlhdCI6MTU2MjI1ODU1MywiZXhwIjoxNTYyMzQ0OTUzfQ.YOR4qyP3XBhG_DZRe3W8MX67riHUgV6TDw-A1_XYp8c"
      }
