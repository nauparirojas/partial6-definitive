import React, { useState, useEffect } from 'react';
import type { Loan, Book, User } from '../types';
import { getStorageData, setStorageData } from '../utils/storage';
import { LoanHistory } from '../components/LoanHistory';

export const HistoryPage: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const loadData = () => {
    setLoans(getStorageData('loans', []));
    setBooks(getStorageData('books', []));
    setUsers(getStorageData('users', []));
  };

  useEffect(() => { loadData(); }, []);

  const handleReturnBook = (loanId: string, bookId: string) => {
    // Marcar préstamo como devuelto
    const updatedLoans = loans.map(l => l.id === loanId ? { ...l, status: 'Devuelto' as const } : l);
    setStorageData('loans', updatedLoans);

    // Incrementar stock del libro de vuelta
    const currentBooks: Book[] = getStorageData('books', []);
    const updatedBooks = currentBooks.map(b => b.id === bookId ? { ...b, stock: b.stock + 1 } : b);
    setStorageData('books', updatedBooks);

    loadData();
  };

  return (
    <div className="container">
      <h1 className="page-heading">Historial de préstamos</h1>
      <p className="page-description">Consulta los préstamos activos y revisa las devoluciones registradas.</p>
      <section className="panel">
        <div className="table-wrap"><LoanHistory loans={loans} books={books} users={users} onReturnBook={handleReturnBook} /></div>
      </section>
    </div>
  );
};