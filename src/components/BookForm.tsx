import React, { useState, useEffect } from 'react';

interface Book {
  id?: number;
  title: string;
  author: string;
  year: string;
  genre: string;
}

interface BookFormProps {
  addBook: (book: Omit<Book, 'id'>) => void;
  updateBook: (book: Book) => void;
  currentBook: Book | null;
}

const BookForm: React.FC<BookFormProps> = ({
  addBook,
  updateBook,
  currentBook,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');

  useEffect(() => {
    if (currentBook) {
      setTitle(currentBook.title);
      setAuthor(currentBook.author);
      setYear(currentBook.year);
      setGenre(currentBook.genre);
    } else {
      setTitle('');
      setAuthor('');
      setYear('');
      setGenre('');
    }
  }, [currentBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentBook) {
      updateBook({ ...currentBook, title, author, year, genre });
    } else {
      addBook({ title, author, year, genre });
    }
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setYear('');
    setGenre('');
  };

  return (
    <form
      className={`mb-4 ${currentBook ? 'row g-3' : 'row g-3 row-cols-md-2'}`}
      onSubmit={handleSubmit}
    >
      <div className={currentBook ? 'col-12' : 'col-md-3'}>
        <input
          type="text"
          className="form-control"
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={currentBook ? 'col-12' : 'col-md-3'}>
        <input
          type="text"
          className="form-control"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className={currentBook ? 'col-12' : 'col-md-2'}>
        <input
          type="text"
          className="form-control"
          placeholder="Rok wydania"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
      </div>
      <div className={currentBook ? 'col-12' : 'col-md-2'}>
        <input
          type="text"
          className="form-control"
          placeholder="Gatunek"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className={currentBook ? 'col-12' : 'col-md-2'}>
        <button type="submit" className="btn btn-primary w-100">
          {currentBook ? 'Edytuj' : 'Dodaj'}
        </button>
      </div>
    </form>
  );
};

export default BookForm;
