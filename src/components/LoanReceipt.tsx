import React from 'react';
import type { Loan, Book, User } from '../types';
import { generatePDFReceipt } from '../utils/pdf';

interface LoanReceiptProps {
  loan: Loan;
  books: Book[];
  users: User[];
}

export const LoanReceipt: React.FC<LoanReceiptProps> = ({ loan, books, users }) => {
  const book = books.find(b => b.id === loan.bookId);
  const user = users.find(u => u.id === loan.userId);

  return (
    <div style={{ background: '#f8fafc', padding: '15px', border: '1px solid #cbd5e1', marginTop: '20px', borderRadius: '6px' }}>
      <h4>Comprobante Digital Generado</h4>
      <p><strong>Código:</strong> {loan.uniqueCode}</p>
      <p><strong>Usuario:</strong> {user?.fullName}</p>
      <p><strong>Libro:</strong> {book?.title}</p>
      <p><strong>Fecha de Préstamo:</strong> {loan.loanDate}</p>
      <p><strong>Fecha Límite:</strong> {loan.dueDate}</p>
      <button onClick={() => generatePDFReceipt(loan, book, user)}>Descargar Comprobante en PDF</button>
    </div>
  );
};