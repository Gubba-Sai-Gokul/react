const data = [
    {
        id: 1,
        title: "The Lord of the Rings",
        publicationDate: "1954-07-29",
        author: "J. R. R. Tolkien",
        genres: [
            "fantasy",
            "high-fantasy",
            "adventure",
            "fiction",
            "novels",
            "literature",
        ],
        hasMovieAdaptation: true,
        pages: 1216,
        translations: {
            spanish: "El señor de los anillos",
            chinese: "魔戒",
            french: "Le Seigneur des anneaux",
        },
        reviews: {
            goodreads: {
                rating: 4.52,
                ratingsCount: 630994,
                reviewsCount: 13417,
            },
            librarything: {
                rating: 4.53,
                ratingsCount: 47166,
                reviewsCount: 452,
            },
        },
    },
    {
        id: 2,
        title: "The Cyberiad",
        publicationDate: "1965-01-01",
        author: "Stanislaw Lem",
        genres: [
            "science fiction",
            "humor",
            "speculative fiction",
            "short stories",
            "fantasy",
        ],
        hasMovieAdaptation: false,
        pages: 295,
        translations: {},
        reviews: {
            goodreads: {
                rating: 4.16,
                ratingsCount: 11663,
                reviewsCount: 812,
            },
            librarything: {
                rating: 4.13,
                ratingsCount: 2434,
                reviewsCount: 0,
            },
        },
    },
    {
        id: 3,
        title: "Dune",
        publicationDate: "1965-01-01",
        author: "Frank Herbert",
        genres: ["science fiction", "novel", "adventure"],
        hasMovieAdaptation: true,
        pages: 658,
        translations: {
            spanish: "",
        },
        reviews: {
            goodreads: {
                rating: 4.25,
                ratingsCount: 1142893,
                reviewsCount: 49701,
            },
        },
    },
    {
        id: 4,
        title: "Harry Potter and the Philosopher's Stone",
        publicationDate: "1997-06-26",
        author: "J. K. Rowling",
        genres: ["fantasy", "adventure"],
        hasMovieAdaptation: true,
        pages: 223,
        translations: {
            spanish: "Harry Potter y la piedra filosofal",
            korean: "해리 포터와 마법사의 돌",
            bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
            portuguese: "Harry Potter e a Pedra Filosofal",
        },
        reviews: {
            goodreads: {
                rating: 4.47,
                ratingsCount: 8910059,
                reviewsCount: 140625,
            },
            librarything: {
                rating: 4.29,
                ratingsCount: 120941,
                reviewsCount: 1960,
            },
        },
    },
    {
        id: 5,
        title: "A Game of Thrones",
        publicationDate: "1996-08-01",
        author: "George R. R. Martin",
        genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
        hasMovieAdaptation: true,
        pages: 835,
        translations: {
            korean: "왕좌의 게임",
            polish: "Gra o tron",
            portuguese: "A Guerra dos Tronos",
            spanish: "Juego de tronos",
        },
        reviews: {
            goodreads: {
                rating: 4.44,
                ratingsCount: 2295233,
                reviewsCount: 59058,
            },
            librarything: {
                rating: 4.36,
                ratingsCount: 38358,
                reviewsCount: 1095,
            },
        },
    },
];

function getBooks() {
    return data;
}

function getBook(id) {
    return data.find((d) => d.id === id);
}

/*
// destructuring
const book = getBook(2);

// const title = book.title;
// const author = book.author;

const { title, author, genres, publicationDate, hasMovieAdaptation } = book;

console.log(title, author, genres, publicationDate, hasMovieAdaptation);

// const primaryGenre = genres[0];
// const secondaryGenre = genres[1];

// Rest and Spread operators

// Rest in destructuring of arrays
const [primaryGenre, secondaryGenre, ...otherGenres] = genres;

console.log(primaryGenre, secondaryGenre, otherGenres);

// const newGenres = [genres, 'epic fantasy'];

// console.log(newGenres); // This will create an array with array and an element

// We need to spread to create a shallow copy

// Spread in creating new array
const newGenres = [...genres, 'epic fantasy'];

console.log(newGenres); // This will create a shallow copy


// Spread in objects
const newBook = { ...book, moviePublicationDate: '2025-11-14', pages: 1550 };

console.log(newBook);

// Rest in objects
const { moviePublicationDate, pages, ...others } = newBook;
console.log(moviePublicationDate, pages, others);


// Template literals
const summary = `${title} is a book of pages ${pages}, was written by ${author} in a year ${publicationDate.split('-')[0]}. The 
book has${hasMovieAdaptation ? "" : " not"} been adapted as a movie.`;
console.log(summary);


// Ternary operator

const pagesRange = pages > 1000 ? "Over a 100" : "Less than 1000";
console.log(pagesRange);

// Short circuting and logical operators
// && operator short circuits when the first value is false then it will return the first value else second value no matter what
console.log(true && "Something"); // Something
console.log(false && "Something"); // false
console.log(0 && "Something"); // 0
console.log(true && "Something" && "Hello"); // Hello
console.log(true && 0 && "Hello"); // 0
// falsy -- 0, "" (empty string), null, undefined
console.log("Jonas" && "Something"); // Something

// || operator is exactly opposite
console.log(true || "Something"); // true
console.log(false || "Something"); // Something
console.log(false || "Something" || true); // Something
console.log(hasMovieAdaptation || "This book has movie adaption");

// Weird
console.log(book.reviews.librarything.reviewsCount || "no data"); // no data (but it has 0 as data);
// use coleasing in this case -- it will return second value when first value is undefined or null
console.log(book.reviews.librarything.reviewsCount ?? "no data");
*/

// Functional Array methods: map(), filter(), reduce()
// Functional as they dont mutate the array but they create new array

// map()
const books = getBooks();

const titles = books.map((book) => book.title);
console.log(titles);

const essentialData = books.map((book) => ({
    title: book.title,
    author: book.author
}));

console.log(essentialData);

// filter
const longBooks = books.filter((book) => {
    return book.pages > 500;
});

console.log(longBooks);

const longBooks2 = books.filter((book) => {
    return book.pages > 100;
}).filter((book) => book.hasMovieAdaptation === false);

console.log(longBooks2.length, longBooks2);

const adventureBooks = books.filter((book) => {
    return book?.genres.includes('adventure');
}).map(book => book.title);

console.log(adventureBooks.length, adventureBooks);

// reduce()
const pagesAllBooks = books.reduce((acc, book) => acc + book.pages, 0);
console.log(pagesAllBooks);

// sort() -- mutates (changes) the original array
const arr = [6, 5, 1, 3, 9];
// a, b are current and next value
// const sorted = arr.sort((a, b) => a - b); // It mutates the original array
// To not mutate the original array use slice() that creates new array and then sorts it
const sorted = arr.slice().sort((a, b) => a-b);
console.log(arr, sorted);

const sortedByPages = books.slice().sort((a, b) => a.pages - b.pages);
console.log(sortedByPages);

// Add, Delete, Updated

// Add Book object to Array
const newBook = {
    id: 6,
    title: 'Harry potter and the chamber of secrets',
    author: 'J. K. Rowling',
};

const booksAfterAdd = [...books, newBook];
console.log(booksAfterAdd);

// Delete 
const booksAfterDelete = booksAfterAdd.filter((book) => book.id !== 3);
console.log(booksAfterDelete);

// Update 
const booksAfterUpdate = booksAfterDelete.map((book) => 
    book.id === 1 ? {...book, pages: 1210} : book
);

console.log(booksAfterUpdate);