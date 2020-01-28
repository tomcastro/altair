import * as fastify from 'fastify'
import { AltairFastify } from '../index'
import { Server, IncomingMessage, ServerResponse } from 'http'

const server: fastify.FastifyInstance<
  Server,
  IncomingMessage,
  ServerResponse
> = fastify({})
const port = 3030

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

const opts: fastify.RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'string',
      },
    },
  },
}

server.get('/', opts, (request, reply) => {
  reply.send('Hello world')
})

server.listen(port, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  console.info(`Example server listening on ${address}`)
})
