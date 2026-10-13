import React, { useState, useEffect } from 'react';
import type { Book, Category } from '../types';
import { getStorageData, setStorageData } from '../utils/storage';
import { CategoryForm } from '../components/CategoryForm';
import { BookForm } from '../components/BookForm';
import { BookList } from '../components/BookList';
import heroImage from '../assets/hero.png';

export const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editBook, setEditBook] = useState<Book | null>(null);

  const loadData = () => {
    setBooks(getStorageData('books', []));
    setCategories(getStorageData('categories', []));
  };

  useEffect(() => { loadData(); }, []);

  const totalStock = books.reduce((total, book) => total + book.stock, 0);

  const handleDelete = (id: string) => {
    const updated = books.filter(b => b.id !== id);
    setStorageData('books', updated);
    setBooks(updated);
  };

  return (
    <div className="container">
      <section className="welcome-banner">
        <div className="welcome-copy">
          <span className="welcome-eyebrow">BIBLIOTECA UNIVERSITARIA</span>
          <h1>Tu biblioteca, organizada.</h1>
          <p>Administra tus libros y categorías en un solo lugar. Mantén los recursos de aprendizaje siempre al alcance.</p>
        </div>
        <img src={heroImage} alt="" />
      </section>
      <div className="stats-grid" aria-label="Resumen del catálogo">
        <article className="stat-card">
          <span className="stat-icon" aria-hidden="true">L</span>
          <div><span>Títulos registrados</span><strong>{books.length}</strong></div>
        </article>
        <article className="stat-card">
          <span className="stat-icon" aria-hidden="true">C</span>
          <div><span>Categorías</span><strong>{categories.length}</strong></div>
        </article>
        <article className="stat-card">
          <span className="stat-icon" aria-hidden="true">E</span>
          <div><span>Ejemplares disponibles</span><strong>{totalStock}</strong></div>
        </article>
      </div>
      <h2 className="page-heading">Catálogo de libros</h2>
      <p className="page-description">Agrega títulos, organiza categorías y revisa la disponibilidad de ejemplares.</p>
      <div className="management-grid">
        <section className="panel">
          <CategoryForm onCategoryAdded={loadData} />
        </section>
        <section className="panel">
          <BookForm editBook={editBook} onFinished={() => { setEditBook(null); loadData(); }} />
        </section>
      </div>
      <section className="panel">
        <h3>Libros registrados</h3>
        <div className="table-wrap">
          <BookList books={books} categories={categories} onEdit={b => setEditBook(b)} onDelete={handleDelete} />
        </div>
      </section>
    </div>
  );
};