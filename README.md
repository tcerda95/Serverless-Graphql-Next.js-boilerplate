# Serverless Graphql Next.js Boilerplate

This boilerplate presents an Apollo Lambda Graphql API and a Next.js server for a simple blogging app.

More information may be found in the directories api and web.

## API

It includes:

* GraphQL Apollo Server Lambda
* Mongoose "persisting" connections
* Authentication via GraphQL directives and injected via context
* Environment variables setup
* Ready for AWS Lambda deployment

## Web

It includes:

* Next.js web server
* Authentication HOCs and user injected via context
* Authentication Bearer token is sent on each request
* CSS-in-JS with styled-components
* Environment variables setup
* Ready for Zeit now 2.0 serverless deployment
