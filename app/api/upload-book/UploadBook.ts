'use server'
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

function generateRandomBookNo() {
  return Math.floor(Math.random() * 1000000); // Generates a random number
}

const prisma = new PrismaClient();

// Define Zod schema for validation
const creationSchema = z.object({
  owner_id: z.string().min(1, 'Owner is Required'),
  book_cover: z.string().min(2, 'book_cover is Required'),
  book_ref_id: z.string().min(1, 'book_ref_id is Required'),
  price: z.string().min(1, 'Price is Required'),
  book_no: z.string().min(4, 'Book Number is Required'), // Added
  quantity: z.string().min(1, 'Quantity is Required'),
  status: z.string().min(4, 'Book Status is Required'),
});

type createBook = z.infer<typeof creationSchema>;

export async function UploadBook(formData: FormData) {

  // Extract non-file data from FormData
  const owner_id = formData.get('owner_id')?.toString() ?? '';
  const book_ref_id = formData.get('book_ref_id')?.toString() ?? '';
  const price = formData.get('price')?.toString() ?? '';
  const quantity = formData.get('quantity')?.toString() ?? '';
  const status = formData.get('status')?.toString() ?? '';
  console.log("see inside the upload Function:", owner_id)
  // Handle the file upload
  const bookCoverFile = formData.get('bookCover') as File;
  let book_cover_path = '';

  if (bookCoverFile) {
    // Define the directory and file path
    const uploadDir = path.resolve('./public/uploads'); // Adjust as needed
    const filePath = path.join(uploadDir, bookCoverFile.name);

    // Ensure the upload directory exists
    await promisify(fs.mkdir)(uploadDir, { recursive: true });

    // Save the file to the server
    await promisify(fs.writeFile)(filePath, Buffer.from(await bookCoverFile.arrayBuffer()));

    // Use the relative file path in your data
    book_cover_path = `/uploads/${bookCoverFile.name}`;
  } else {
    return {
      error: 'No file uploaded for book cover',
      success: false,
    };
  }

  // Create an object from the form data
  const data: createBook = {
    book_ref_id,
    book_cover: book_cover_path, // Use the file path
    owner_id,
    price,
    book_no: generateRandomBookNo().toString(), // Correct assignment
    quantity,
    status,
  };

  // Validate the data using Zod schema
  try {
    creationSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const messages = error.errors.map(err => err.message).join(', ');
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

  // Save to the database
  try {
    await prisma.bookUploaded.create({
      data: {
        owner_id: parseInt(data.owner_id),
        book_ref_id: parseInt(data.book_ref_id),
        book_cover: data.book_cover, // Path to the file
        price: parseFloat(data.price),
        book_no: parseInt(data.book_no),
        quantity: parseInt(data.quantity),
        status: "free",
      },
    });
    return {
      message: 'Book registered successfully',
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
