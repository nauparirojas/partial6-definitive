export type UserType = 'Estudiante' | 'Docente';
export type LoanStatus = 'Activo' | 'Devuelto';

export interface Category {
  id: string;
  name: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  categoryId: string;
  stock: number;
}

export interface User {
  id: string;
  fullName: string;
  universityCode: string;
  email: string;
  userType: UserType;
}

export interface Loan {
  id: string;
  userId: string;
  bookId: string;
  loanDate: string;
  dueDate: string;
  status: LoanStatus;
  uniqueCode: string;
}