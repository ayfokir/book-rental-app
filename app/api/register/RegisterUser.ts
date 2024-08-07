// app/actions.ts
'use server'
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Define Zod schema for validation
const registrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(2, 'Password must be at least 8 characters long'),
  confirmPassword: z.string().min(2, 'Confirm Password must be at least 8 characters long'),
  location: z.string().min(1, 'Location is required '),
  phone: z.string().min(1, 'Phone number is required')
    .regex(/^\d+$/, 'Phone number must contain only digits'),
});

type RegistrationData = z.infer<typeof registrationSchema>;

export async function RegisterUser(formData: FormData) {
  // Extract data from FormData
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';
  const confirmPassword = formData.get('confirmPassword')?.toString() ?? '';
  const location = formData.get('location')?.toString() ?? '';
  const phone = formData.get('phone')?.toString() ?? '';
  
  console.log("see user data:",  email)
  // Create an object from the form data
  const data: RegistrationData = {
    email,
    password,
    confirmPassword,
    location,
    phone,
  };

  // Validate the data using Zod schema
  try {
    registrationSchema.parse(data);
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

  // Check if passwords match
  if (data.password !== data.confirmPassword) {
    return {
      error: 'Passwords do not match',
      success: false
    };
  }
  
  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  
  if (existingUser) {
    return {
      error: 'Email already registered',
      success: false
    };
  }
  

  //Generate a salt and hash password
  const salt = await bcrypt.genSalt(10)
  console.log("see the salt:", salt)
  //salt : the randomly generated string contain number , string, character
  // Hash the password
  const hashedPassword = await bcrypt.hash(data.password, salt);
  // the password and salt mixed 10 times(eyedegageme) using bcrypt algorithm , slower mekelakelu 
  // Save user to the database
  try {
    await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        role: 'renter', // Adjust as needed
        phone_number: data.phone,
        location: data.location,
      },
    });
    return {
      // the return statment is based on the API return value
      message: 'User registered successfully',
      // return user name, to write welcome message 
      success: true
    };
  } catch (error: unknown) {
    // Use type assertion to handle 'error' as an Error
    if (error instanceof Error) {
        return {
            error: error.message, // Extract and return the error message as a string
            success: false
        };
    }
    // Handle other types of errors or unknown types
    return {
        error: 'An unexpected error occurred',
        success: false
    };
}
}


//hashed yehonutn password new compare yemeyadergew saltuan and kitirwunm ke hased password yawotal then  hashed yadergal login passworduwun then compare yadergal hultwun hashed yehonutn 