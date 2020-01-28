'use strict'

import * as fastify from 'fastify'
import * as fp from 'fastify-plugin'
import * as fastifyStatic from 'fastify-static'
import * as fastifyUrlData from 'fastify-url-data'
import {
  getDistDirectory,
  renderAltair,
  renderInitialOptions,
  RenderOptions,
} from 'altair-static'
import path = require('path')

interface Options {
  prefix?: string
  options: RenderOptions
}

export const AltairFastify = fp(
  (server: fastify.FastifyInstance, opts: Options, done: Function): void => {
    const { options, prefix } = opts
    server.register(fastifyUrlData)

    server.register(fastifyStatic, {
      root: getDistDirectory(),
      prefix,
    })

    server.get(`${prefix}/`, (request, reply) => {
      const { path } = request.urlData()
      if (path.substr(-1) !== '/') {
        reply.status(301).redirect(`${path}/`)
        return
      }

      reply.type('text/html').send(renderAltair(options))
    })

    server.get(`${prefix}/initial_options.js`, (request, reply) => {
      reply.header('Content-Type', 'text/javascript')
      reply.send(renderInitialOptions(options))
    })

    // server.get(`${opts.prefix}/*`, (request, reply) => {
    //   reply.status(404)
    // })

    done()
  },
  {
    fastify: '2.x',
    name: 'altair-fastify-plugin',
  }
)
