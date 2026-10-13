import React, { useState, useEffect } from 'react';
import type { Book, Category } from '../types';
import { getStorageData, setStorageData } from '../utils/storage';

interface BookFormProps {
  editBook?: Book | null;
  onFinished: () => void;
}

export const BookForm: React.FC<BookFormProps> = ({ editBook, onFinished }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [stock, setStock] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(getStorageData('categories', []));
    if (editBook) {
      setTitle(editBook.title);
      setAuthor(editBook.author);
      setIsbn(editBook.isbn);
      setCategoryId(editBook.categoryId);
      setStock(editBook.stock);
    }
  }, [editBook]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const books: Book[] = getStorageData('books', []);

    if (editBook) {
      const updated = books.map(b => b.id === editBook.id ? { ...b, title, author, isbn, categoryId, stock } : b);
      setStorageData('books', updated);
    } else {
      const newBook: Book = { id: Date.now().toString(), title, author, isbn, categoryId, stock };
      setStorageData('books', [...books, newBook]);
    }
    setTitle(''); setAuthor(''); setIsbn(''); setStock(1);
    onFinished();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{editBook ? 'Editar Libro' : 'Registrar Nuevo Libro'}</h3>
      <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} required />
      <input type="text" placeholder="Autor" value={author} onChange={e => setAuthor(e.target.value)} required />
      <input type="text" placeholder="ISBN" value={isbn} onChange={e => setIsbn(e.target.value)} required />
      <select value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
        <option value="">Seleccione Categoría</option>
        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>
      <input type="number" min="0" placeholder="Stock" value={stock} onChange={e => setStock(Number(e.target.value))} required />
      <button type="submit">{editBook ? 'Actualizar' : 'Registrar'}</button>
    </form>
  );
};