const { z } = require('zod');

const createUserSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email format"),
  address: z.string().optional()
});

module.exports = { createUserSchema };