const fastify = require("fastify")();

const { PrismaClient } = require("@prisma/client");
const { createUserSchema } = require("./schemas/user");
const prisma = new PrismaClient();

fastify.addHook("onRequest", (request, reply, done) => {
  console.log(`Request made to: ${request.url}`);
  done();
});

const userSchema = {
  params: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 4 },
    },
    required: ["name"],
  },
};

fastify.get("/", async (request, reply) => {
  return { message: "Hello, its Harshit here!" };
});

fastify.get("/greet/:name", { schema: userSchema }, async (request, reply) => {
  const { name } = request.params;
  return { message: `Hello, ${name}!` };
});

fastify.post("/user", async (request, reply) => {
  const { name, email } = request.body;

  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return { message: "User created successfully", user: newUser };
});

const start = async () => {
  try {
    console.log("Testing database connection...");
    // Correctly use tagged template literal
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connected successfully.");

    console.log("Starting Fastify...");
    await fastify.listen({ port: 3000, host: "localhost" });

    console.log("Server listening on http://localhost:3000");
  } catch (err) {
    console.error(
      "Error connecting to the database or starting the server:",
      err
    );
    process.exit(1); // Exit if any error occurs
  }
};

start();

// const fastify = require('fastify')();
// const { PrismaClient } = require('@prisma/client');
// const { createUserSchema } = require('./schemas/user');
// const prisma = new PrismaClient();

// // GET /greet/:name route
// fastify.get('/greet/:name', {
//   schema: {
//     params: {
//       type: 'object',
//       properties: {
//         name: { type: 'string', minLength: 4 }
//       },
//       required: ['name']
//     }
//   }
// }, async (request, reply) => {
//   const { name } = request.params;
//   return { message: `Hello, ${name}!` };
// });

// // POST /user to create a new user
// fastify.post('/user', {
//   schema: {
//     body: createUserSchema
//   }
// }, async (request, reply) => {
//   const { name, email } = request.body;

//   // Create the user in the database using Prisma
//   const newUser = await prisma.user.create({
//     data: {
//       name,
//       email
//     }
//   });

//   return { message: 'User created successfully', user: newUser };
// });

// const start = async () => {
//     try {
//       await fastify.listen({ port: 3000 });
//       console.log('Server listening on http://localhost:3000');
//     } catch (err) {
//       fastify.log.error(err);
//     }
//   }

// start();
