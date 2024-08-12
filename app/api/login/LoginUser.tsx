// app/actions.ts
'use server'
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(2, 'Password must be at least 8 characters long'),
});

type LoginData = z.infer<typeof loginSchema>;

export async function LoginUser(formData: FormData) {
  // Extract data from FormData
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;
  console.log("see secret:", jwtSecret)
  // Create an object from the form data
  const data: LoginData = {
    email,
    password,
  };
  console.log("see data ", data)
  // Validate the data using Zod schema
  try {
    loginSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Handle validation errors
      const messages = error.errors.map(err => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    // Handle other types of errors
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }

  // Check if the user exists
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    console.log("see user:", user)

    if (!user) {
      return {
        error: 'User not found',
        success: false,
      };
    }
    
    // Compare the password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    
    if (!isPasswordValid) {
      return {
        error: 'Invalid password',
        success: false,
      };
    }

    // Generate JWT token if needed
    const payload = { // the payload data is not be  sensitive 
      user_id: user.user_id,
      role: user.role
      // email: user.email
    }
    console.log(jwtSecret)
    const token = jwt.sign(payload, jwtSecret!, { expiresIn: '24h' });
    console.log(token)
    // Return success if the login is valid
    return {
      message: 'Logged in successfully',
      token, // Include the token in the response if needed
      // user,
      success: true,
    };

  } catch (error: unknown) {
    // Use type assertion to handle 'error' as an Error
    if (error instanceof Error) {
      return {
        error: error.message, // Extract and return the error message as a string
        success: false,
      };
    }
    
    // Handle other types of errors or unknown types
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }
}

// token based authentication , checke the password first and then token generate adergo le login ladergew user yilkal, then save ydergal on the browser , then every page visite sitareg 
// yerasuwan token ayayeza tilkaleche 