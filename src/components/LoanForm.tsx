import React, { useState, useEffect } from 'react';
import type { Book, User, Loan } from '../types';
import { getStorageData, setStorageData } from '../utils/storage';

export const LoanForm: React.FC<{ onLoanCreated: (loan: Loan) => void }> = ({ onLoanCreated }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedBookId, setSelectedBookId] = useState('');

  useEffect(() => {
    setBooks(getStorageData('books', []));
    setUsers(getStorageData('users', []));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentBooks: Book[] = getStorageData('books', []);
    const book = currentBooks.find(b => b.id === selectedBookId);

    if (!book || book.stock <= 0) {
      alert('El libro no cuenta con stock disponible.');
      return;
    }

    // Actualizar stock
    const updatedBooks = currentBooks.map(b => b.id === selectedBookId ? { ...b, stock: b.stock - 1 } : b);
    setStorageData('books', updatedBooks);
    setBooks(updatedBooks);

    // Crear préstamo
    const newLoan: Loan = {
      id: Date.now().toString(),
      userId: selectedUserId,
      bookId: selectedBookId,
      loanDate: new Date().toLocaleDateString(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      status: 'Activo',
      uniqueCode: `LOAN-${Math.floor(100000 + Math.random() * 900000)}`
    };

    const loans: Loan[] = getStorageData('loans', []);
    setStorageData('loans', [...loans, newLoan]);
    onLoanCreated(newLoan);
    setSelectedUserId('');
    setSelectedBookId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Solicitar Préstamo de Libro</h3>
      <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} required>
        <option value="">Seleccione Usuario</option>
        {users.map(u => <option key={u.id} value={u.id}>{u.fullName} ({u.universityCode})</option>)}
      </select>
      <select value={selectedBookId} onChange={e => setSelectedBookId(e.target.value)} required>
        <option value="">Seleccione Libro</option>
        {books.map(b => (
          <option key={b.id} value={b.id} disabled={b.stock <= 0}>
            {b.title} (Stock: {b.stock})
          </option>
        ))}
      </select>
      <button type="submit">Generar Préstamo</button>
    </form>
  );
};