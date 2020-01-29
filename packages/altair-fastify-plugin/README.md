# altair-fastify-plugin

[![npm](https://img.shields.io/npm/v/altair-fastify-plugin.svg)](https://www.npmjs.com/package/altair-fastify-plugin)

This is a Fastify plugin for mounting an instance of Altair GraphQL client.

### Installation

This is a node module and can be installed using npm:

```
npm install --save altair-fastify-plugin
```

Alternatively, if you are using [`yarn`](https://yarnpkg.com/):

```
yarn add altair-fastify-plugin
```

### Usage

```js
import fastify from 'fastify'
import GQL from 'fastify-graphql'
import { altairFastify } from 'altair-fastify-plugin'

import { schema } from './schema'
import { resolvers } from './resolvers

const server = fastify()

server.register(GQL, {
  schema,
  resolvers
})

server.register(AltairFastify, {
  prefix: '/altair',
  options: {
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:5400/subscriptions`,
    initialPreRequestScript: `console.log('Hello from pre request!')`,
    // serveInitialOptionsInSeperateRequest: true,
    initialQuery: `{ getData { id name surname } }`,
  },
})

// ... the rest of your code ...
```

An instance of Altair GraphQL Client would be available at `/altair` of your server.

### Contributing

Everyone is welcome to contribute. See anything that needs improving, create an issue. And if you're up for it, create a PR! :D

### License

[MIT](../../LICENSE)
