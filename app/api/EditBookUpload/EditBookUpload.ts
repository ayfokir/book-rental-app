'use server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const prisma = new PrismaClient();

// Define Zod schema for validation
const updateSchema = z.object({
  id: z.string().min(1, 'Book ID is Required'),
  book_cover: z.string().min(1, "Book Cover Required"),
  price: z.string().min(1, 'Price is Required'),
  quantity: z.string().min(1, 'Quantity is Required'),
});

type updateBook = z.infer<typeof updateSchema>;

export async function EditBookUpload(formData: FormData) {
  const id = formData.get('book_id')?.toString() ?? '';
  const price = formData.get('price')?.toString() ?? '';
  const quantity = formData.get('quantity')?.toString() ?? '';
  const book_cover_path = formData.get('book_cover_path')?.toString() ?? '';

  console.log("see quantity:", quantity);
  console.log("see price:", price);
  console.log("see id:", id);
  console.log("book_cover_path:", book_cover_path);

  // Handle the file upload
  const bookCoverFile = formData.get('bookCover') as File | null;
  let book_cover = book_cover_path;

  const existingBook = await prisma.bookUploaded.findUnique({ where: { book_id: parseInt(id) } });
  if (!existingBook) {
    return {
      error: 'Book not found',
      success: false,
    };
  }

  if (bookCoverFile && bookCoverFile.name && bookCoverFile.size > 0) {
        console.log("inside write file", bookCoverFile)
    // Define the directory and file path
    const uploadDir = path.resolve('./public/uploads'); // Adjust as needed
    const filePath = path.join(uploadDir, bookCoverFile.name);

    // Ensure the upload directory exists
    await promisify(fs.mkdir)(uploadDir, { recursive: true });

    // Save the file to the server
    await promisify(fs.writeFile)(filePath, Buffer.from(await bookCoverFile.arrayBuffer()));

    // Use the relative file path in your data
    book_cover = `/uploads/${bookCoverFile.name}`;
  }

  console.log("see book cover:", book_cover);

  // Create an object from the form data
  const data: updateBook = {
    id,
    book_cover, // Use the file path or existing path
    price,
    quantity,
  };

  // Validate the data using Zod schema
  try {
    updateSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map((err) => err.message).join(', ');
      return {
        error: messages,
        success: false,
      };
    }
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }

  // Update the book in the database
  try {
    await prisma.bookUploaded.update({
      where: { book_id: parseInt(data.id) },
      data: {
        book_cover: data.book_cover,
        price: parseInt(data.price),
        quantity: parseInt(data.quantity),
      },
    });
    return {
      message: 'Book updated successfully',
      success: true,
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: error.message,
        success: false,
      };
    }
    return {
      error: 'An unexpected error occurred',
      success: false,
    };
  }
}
