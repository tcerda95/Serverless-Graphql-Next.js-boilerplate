# Serverless GraphQL API

## Serverless Framework

* Install: `npm install -g serverless`
* Login: `serverless login`
* [Set up credentials](https://serverless.com/framework/docs/providers/aws/guide/credentials/)
* Configure credentials: `serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`
* Run lambda offline: `serverless offline start` or `npm start`

## Mongoose

Mongoose models are attached to the GraphQL context. Read them as `context.MODEL`.

In order to preserve database connections between lambda invocations `context.callbackWaitsForEmptyEventLoop` is set to `false`. See [Using Mongoose With AWS Lambda](https://mongoosejs.com/docs/lambda.html).

## Logging

The [winston](https://github.com/winstonjs/winston) library is used for logging. An example default logger is given in [logger.js](src/utils/logger.js).

## Environment variables

`cp .env.example.yml .env.yml`

Set up production and development environment variables and read them as `process.env.ENV_VAR`.

You may read an specific environment variable into `serverless.yml` as: `${file(.env.yml):${self:provider.stage}.ENV_VAR}`

To set an specific stage when launching the lambda, pass the `--stage <STAGE>` property to `serverless` command.

## Scripts

Development: `npm start` This will launch a GraphQL server to http://localhost:4000

Deploy: `npm run deploy` This will deploy to the AWS Lambda service as configured in `serverless.yml`

## Authentication

Directives are used for authentication, for example `@isAuthenticated` and `@hasRole`. Based on [graphql-directive-auth](https://github.com/graphql-community/graphql-directive-auth#what-default-means-and-what-i-need-to-do).

Simply tag a a field or field definition as `@isAuthenticated` and the parsed jwt token will be available at `context.auth`. See [post mutation resolver](src/resolvers/Mutation.js).

## Idea behind the example

The example models a simple blogging API. The GraphQL schema represents the business domain model and the Mongoose schema represents the MongoDB model.

An specific `User` may post many `Post` while an specific `Post` is associated to an unique author. Authentication is provided by the `signIn` and `signUp` mutations and the `post` mutation may only executed by an authenticated `User`.
