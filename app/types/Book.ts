// src/interfaces/Book.ts
export interface Book {
    book_id: number;
    id: string;
    book_no?: string;
    book_name?: string;
    author_name?: string
    category?:  string
    status: string;
    price?: string ;
    owner:  string;
  }
export interface Owner {
  owner_id: string;
  location: string;
  owner: string;
  upload: number
}

  

