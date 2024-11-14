import React, { useState } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  genre: string;
}

const App: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [myLibrary, setMyLibrary] = useState<Book[]>([]);
  const [showMyLibrary, setShowMyLibrary] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [showModal, setShowModal] = useState(false);

  const addBook = (book: Book) => {
    setBooks([...books, { ...book, id: Date.now() }]);
  };

  const updateBook = (updatedBook: Book) => {
    setBooks(
      books.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
    closeModal();
  };

  const deleteBook = (id: number) => {
    if (showMyLibrary) {
      setMyLibrary(myLibrary.filter((book) => book.id !== id));
    } else {
      setBooks(books.filter((book) => book.id !== id));
    }
  };

  const addToMyLibrary = (book: Book) => {
    if (!myLibrary.some((myBook) => myBook.id === book.id)) {
      setMyLibrary([...myLibrary, book]);
      triggerToast();
    }
  };

  const setEditBook = (book: Book) => {
    setCurrentBook(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentBook(null);
  };

  const toggleLibraryView = () => {
    setShowMyLibrary(!showMyLibrary);
  };

  const triggerToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">
        Biblioteka
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-book m-3"
          viewBox="0 0 16 16"
        >
          <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
        </svg>
      </h1>
      <button className="btn btn-secondary mb-3" onClick={toggleLibraryView}>
        {showMyLibrary ? 'Wszystkie książki' : 'Moje książki'}
      </button>
      {!showMyLibrary && !showModal && (
        <BookForm
          addBook={addBook}
          updateBook={updateBook}
          currentBook={null}
        />
      )}
      <BookList
        books={showMyLibrary ? myLibrary : books}
        setEditBook={setEditBook}
        deleteBook={deleteBook}
        addToMyLibrary={addToMyLibrary}
        isMyLibrary={showMyLibrary}
      />

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          tabIndex={-1}
          role="dialog"
          aria-labelledby="bookModalLabel"
          aria-hidden={!showModal}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="bookModalLabel">
                  Edytuj książkę
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <BookForm
                  addBook={addBook}
                  updateBook={updateBook}
                  currentBook={currentBook}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`toast position-fixed bottom-0 start-50 translate-middle-x p-3 ${
          showToast ? 'show' : 'hide'
        }`}
        style={{ zIndex: 1050 }}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header bg-success text-white">
          <strong className="me-auto">Powiadomienie</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowToast(false)}
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Książka dodana do biblioteki!</div>
      </div>
    </div>
  );
};

export default App;
