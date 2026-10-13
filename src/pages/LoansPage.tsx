import React, { useState, useEffect } from 'react';
import type { Loan, Book, User } from '../types';
import { getStorageData } from '../utils/storage';
import { LoanForm } from '../components/LoanForm';
import { LoanReceipt } from '../components/LoanReceipt';

export const LoansPage: React.FC = () => {
  const [latestLoan, setLatestLoan] = useState<Loan | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setBooks(getStorageData('books', []));
    setUsers(getStorageData('users', []));
  }, []);

  return (
    <div className="container">
      <h1 className="page-heading">Préstamos</h1>
      <p className="page-description">Crea un préstamo y genera su comprobante digital.</p>
      <section className="panel">
        <LoanForm onLoanCreated={loan => { setLatestLoan(loan); setBooks(getStorageData('books', [])); }} />
      </section>
      {latestLoan && <section className="panel"><LoanReceipt loan={latestLoan} books={books} users={users} /></section>}
    </div>
  );
};