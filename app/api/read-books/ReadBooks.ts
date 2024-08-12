// app/actions.ts
'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function ReadBooks() {

  try {
   let books =  await prisma.book.findMany();
    return {
      // the return statment is based on the API return value
        books,
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

