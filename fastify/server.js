// // Import the framework and instantiate it
// import Fastify from 'fastify'
// const fastify = Fastify({
//   logger: true
// })

// // Declare a route
// fastify.get('/', async function handler (request, reply) {
//   return { hello: 'world' }
// })

// // Run the server!
// try {
//   await fastify.listen({ port: 3000 })
// } catch (err) {
//   fastify.log.error(err)
//   process.exit(1)
// }

// ESM
import Fastify from 'fastify'
import dbConnector from './our-db-connector.js'
import firstRoute from './our-first-route.js'

const fastify = Fastify({
  logger: true
})


fastify.get('/', async (request, reply) => {
  return { hello: 'world' }
})

fastify.register(dbConnector)
fastify.register(firstRoute)

/**
 * Run the server!
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()