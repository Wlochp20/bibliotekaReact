import React from 'react';
import BookItem from './BookItem';

interface BookListProps {
  books: Book[];
  setEditBook: (book: Book) => void;
  deleteBook: (id: number) => void;
  addToMyLibrary: (book: Book) => void;
  isMyLibrary: boolean;
}

const BookList: React.FC<BookListProps> = ({
  books,
  setEditBook,
  deleteBook,
  addToMyLibrary,
  isMyLibrary,
}) => {
  return (
    <div className="list-group">
      {books.map((book) => (
        <BookItem
          key={book.id}
          book={book}
          setEditBook={setEditBook}
          deleteBook={deleteBook}
          addToMyLibrary={addToMyLibrary}
          showAddButton={!isMyLibrary}
          showEditButton={!isMyLibrary}
        />
      ))}
    </div>
  );
};

export default BookList;
