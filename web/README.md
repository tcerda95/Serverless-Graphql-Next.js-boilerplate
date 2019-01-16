# Next JS web server

## Quick start

`npm install`

Development: `npm run dev`

Deployment: `now`

## React Apollo

Both the [Query](https://www.apollographql.com/docs/react/essentials/queries.html) and [Mutation](https://www.apollographql.com/docs/react/essentials/mutations.html) components may be used as well as injecting the Apollo client via [withApollo](https://www.apollographql.com/docs/react/api/react-apollo.html#withApollo).

## CSS-in-JS

[styled-components](https://www.styled-components.com/) is used as a CSS-in-JS library.

Global styles may be configured via [lib/GlobalStyle.jsx](lib/GlobalStyle.jsx).

## Authentication

The user may be retrieved by the `withUser` HOC ([See Header.jsx](components/Layout/Header.jsx)) or inside `getInitialProps` as `context.user`.

The user can sign in via `auth.signIn(user, token)` and the properties may be retrieved by `auth.loggedUser()` and `auth.token()`.

Finally, the authentication Bearer token is sent on each graphQL request. [See lib/withApollo.js](lib/withApollo.js).

## Environment variables

Environment variables are set by `env-config.js`. Since they are stringified by Babel it is not appropiate to set this file private since client code source can be inspected by any browser. Therefore private credentials should not be set in `env-config.js`.

[See with universal configuration build time example](https://github.com/zeit/next.js/tree/canary/examples/with-universal-configuration-build-time).

## Deployment Zeit Now 2

Install now CLI: `npm install -g now`.

Configure `now.json`. [More information](https://zeit.co/examples/nextjs).

Deploy with `now`.

## Idea behind the example

The example represents a simple blog webapp. Users may sign up and sign in. Only signed in users are allowed to write a post.

Posts are server side rendered on the main page.
