// app/actions.ts
'use server'
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define Zod schema for validation
const creationSchema = z.object({
  book_name: z.string().min(2, 'Book Name is Required'),
  author_name: z.string().min(2, 'Author is Required'),
  category: z.string().min(2, 'Category os Required'),
});

type createBook = z.infer<typeof creationSchema>;

export async function CreatBook(formData: FormData) {
  // Extract data from FormData
  console.log("inside Crud Method")
  const book_name = formData.get('book_name')?.toString() ?? '';
  const author_name = formData.get('author_name')?.toString() ?? '';
  const category = formData.get('category')?.toString() ?? '';
  
  console.log("see the data:", category)
  // Create an object from the form data
    const data: createBook = {
    book_name,
    author_name,
    category
    };

  // Validate the data using Zod schema
  try {
    creationSchema.parse(data);
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

  try {
    await prisma.book.create({
      data: {
        book_name: data.book_name,
        author_name: data.author_name,
        category: data.category,
      },
    });
    return {
      // the return statment is based on the API return value
      message: 'Book registered successfully',
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

