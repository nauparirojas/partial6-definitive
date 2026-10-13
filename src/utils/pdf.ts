import type { Loan, Book, User } from '../types';

export const generatePDFReceipt = (loan: Loan, book?: Book, user?: User) => {
  const content = `
    COMPROBANTE DIGITAL DE PRÉSTAMO - BIBLIOTECA UNIVERSITARIA
    ----------------------------------------------------------
    Código Único de Préstamo: ${loan.uniqueCode}
    Fecha de Préstamo: ${loan.loanDate}
    Fecha Límite de Devolución: ${loan.dueDate}
    Estado: ${loan.status}
    
    DATOS DEL USUARIO:
    Nombre: ${user?.fullName || 'N/A'}
    Código Universitario: ${user?.universityCode || 'N/A'}
    Tipo: ${user?.userType || 'N/A'}
    
    DATOS DEL LIBRO:
    Título: ${book?.title || 'N/A'}
    Autor: ${book?.author || 'N/A'}
    ISBN: ${book?.isbn || 'N/A'}
    ----------------------------------------------------------
    Este documento es un comprobante digital emitido por el sistema.
  `;

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `Comprobante_${loan.uniqueCode}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};