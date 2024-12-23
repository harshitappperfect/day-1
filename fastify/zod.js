// import { z } from 'zod';

const z = require('zod');
const UserSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters'),
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must contain at least 8 characters'),
  age: z.number().optional(),
});

// Type inference in action
const validUserData = { 
    username: 'johnsmith', 
    email: 'john@example.com', 
    password: 'strongpassword123' 
};

const myUser = UserSchema.parse(validUserData); 
console.log(myUser);