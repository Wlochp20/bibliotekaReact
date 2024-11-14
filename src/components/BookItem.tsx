import React from 'react';

interface BookItemProps {
  book: Book;
  setEditBook: (book: Book) => void;
  deleteBook: (id: number) => void;
  addToMyLibrary: (book: Book) => void;
  showAddButton: boolean;
  showEditButton: boolean;
}

const BookItem: React.FC<BookItemProps> = ({
  book,
  setEditBook,
  deleteBook,
  addToMyLibrary,
  showAddButton,
  showEditButton,
}) => {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-1">{book.title}</h5>
        <p className="mb-1">Autor: {book.author}</p>
        <p className="mb-1">Rok wydania: {book.year}</p>
        <p className="mb-1">Gatunek: {book.genre}</p>
      </div>
      <div>
        {showAddButton && (
          <button
            className="btn btn-success me-2"
            onClick={() => addToMyLibrary(book)}
          >
            Dodaj do biblioteki
          </button>
        )}
        {showEditButton && (
          <button
            className="btn btn-primary me-2"
            onClick={() => setEditBook(book)}
          >
            Edytuj
          </button>
        )}
        <button className="btn btn-danger" onClick={() => deleteBook(book.id)}>
          Usuń
        </button>
      </div>
    </div>
  );
};

export default BookItem;
