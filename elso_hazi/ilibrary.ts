import {Book} from './book.js';

export interface ILibrary{
	addBook(book: Book): void;
	removeBook(id: string): void;
	findBookById(id: string): Book | undefined;
	listAllBooks(): Book[];	
} 