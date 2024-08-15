'use server'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DeleteBookUpload(book_id: number) {
  try {
    // Check if the book exists
    const book = await prisma.bookUploaded.findUnique({
      where: {
        book_id: book_id
      }
    });
    console.log("see book:", book)
    // If the book does not exist, return an appropriate response
    if (!book) {
      return {
        error: 'Book not found',
        success: false
      };
    }

    // Proceed with deletion if the book exists
    const deletedBook = await prisma.bookUploaded.delete({
      where: {
        book_id: book_id
      }
    });


    console.log("see after delete:", deletedBook)
    // Return a success response if the deletion was successful
    return {
      book_id :  deletedBook.book_id,
      message: "Book Deleted Successfully",
      success: true
    };
  } catch (error: unknown) {
    // Use type assertion to handle 'error' as an Error
    if (error instanceof Error) {
      // Return the error message if it's an instance of Error
      return {
        error: error.message,
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
