import React from 'react';
import type { Book, Category } from '../types';

interface BookListProps {
  books: Book[];
  categories: Category[];
  onEdit: (book: Book) => void;
  onDelete: (id: string) => void;
}

export const BookList: React.FC<BookListProps> = ({ books, categories, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Título</th>
          <th>Autor</th>
          <th>ISBN</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {books.length === 0 ? (
          <tr><td className="empty-state" colSpan={6}>Aún no hay libros registrados. Agrega tu primer título para comenzar.</td></tr>
        ) : books.map(b => {
          const cat = categories.find(c => c.id === b.categoryId);
          return (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{cat?.name || 'N/A'}</td>
              <td>{b.stock}</td>
              <td>
                <button onClick={() => onEdit(b)}>Editar</button>
                <button onClick={() => onDelete(b.id)} style={{ backgroundColor: '#dc2626', marginLeft: '5px' }}>Eliminar</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};