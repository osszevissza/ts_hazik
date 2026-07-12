import { Library } from './library.js';
import { Book } from './book.js';

export class User {
    private borrowedBooks: Book[] = [];
    constructor(
        public userId: string,
        public name: string,
        public email: string
    ) {}

    borrowBook(library: Library, bookId: string): void {
        const book = library.findBookById(bookId);
        if (book) {
            library.removeBook(bookId);              
            this.borrowedBooks.push(book);           
            console.log(`${this.name} kikölcsönözte: ${book.title}`);
        } else {
            console.log(`Ilyen könyv nincs: ${bookId}`);
        }
    }

    listBorrowedBooks(): void {
        console.log(`${this.name} kikölcsönzött könyvei:`);
        this.borrowedBooks.forEach(book => {
            console.log(`  - ${book.title}`);
        });
    }
}
