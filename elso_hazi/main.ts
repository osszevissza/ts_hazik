import { Book } from './book.js';
import { Library } from './library.js';
import { User } from './user.js';

const myLibrary = new Library();

const book1 = new Book('1', 'A háromtest-probléma', 'Cixin Liu', 3500);
const book2 = new Book('2', 'Fhérgek', 'Orson Scott Card', 3200);
const book3 = new Book('3', 'Budapesti Skizo', 'Hazai Attila', 2500);
const book4 = new Book('4', 'Nullánál is kevesebb', 'Bret Easton Ellis', 3500);
const book5 = new Book('5', 'Rumnapló', 'Hunter S. Thompson', 3000);
const book6 = new Book('6', 'A Pendragon-legenda', 'Szerb Antal', 2800);


myLibrary.addBook(book1);
myLibrary.addBook(book2);
myLibrary.addBook(book3);
myLibrary.addBook(book4);
myLibrary.addBook(book5);
myLibrary.addBook(book6);

console.log('Könyvek a könyvtárban:');
myLibrary.listAllBooks().forEach(book => {
    console.log(`  - ${book.title}: ${book.author} (${book.price} Ft)`);
});

const user = new User('u1', 'Marina', 'osszevissza@posteo.com');

user.borrowBook(myLibrary, '2'); 

console.log('\nKönyvek a könyvtárban a kölcsönzés után:');
myLibrary.listAllBooks().forEach(book => {
    console.log(`  - ${book.title}`);
});