// src/interfaces/Book.ts
export interface Book {
    book_id: string
    book_no: string;
    book_name?: string;
    author_name?: string
    category?:  string
    status: string;
    price: string ;
    owner:  string;
  }
export interface Owner {
  owner_id: string;
  quantity: string;
  location: string;
  status: string;
  price: string;
  owner: string;
}

  

