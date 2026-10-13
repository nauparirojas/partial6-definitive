import React from 'react';
import type { Loan, Book, User } from '../types';

interface LoanHistoryProps {
  loans: Loan[];
  books: Book[];
  users: User[];
  onReturnBook: (loanId: string, bookId: string) => void;
}

export const LoanHistory: React.FC<LoanHistoryProps> = ({ loans, books, users, onReturnBook }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Usuario</th>
          <th>Libro</th>
          <th>Préstamo</th>
          <th>Devolución</th>
          <th>Estado</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        {loans.length === 0 ? (
          <tr><td className="empty-state" colSpan={7}>Todavía no hay préstamos en el historial.</td></tr>
        ) : loans.map(l => {
          const user = users.find(u => u.id === l.userId);
          const book = books.find(b => b.id === l.bookId);
          return (
            <tr key={l.id}>
              <td>{l.uniqueCode}</td>
              <td>{user?.fullName || 'Desconocido'}</td>
              <td>{book?.title || 'Desconocido'}</td>
              <td>{l.loanDate}</td>
              <td>{l.dueDate}</td>
              <td><span className={`status-pill${l.status === 'Devuelto' ? ' returned' : ''}`}>{l.status}</span></td>
              <td>
                {l.status === 'Activo' && (
                  <button onClick={() => onReturnBook(l.id, l.bookId)} style={{ backgroundColor: '#10b981' }}>
                    Devolver
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};