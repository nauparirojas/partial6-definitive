import React from 'react';
import type { User } from '../types';

export const UserList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre Completo</th>
          <th>Código</th>
          <th>Correo</th>
          <th>Tipo</th>
        </tr>
      </thead>
      <tbody>
        {users.length === 0 ? (
          <tr><td className="empty-state" colSpan={4}>Todavía no hay usuarios registrados.</td></tr>
        ) : users.map(u => (
          <tr key={u.id}>
            <td>{u.fullName}</td>
            <td>{u.universityCode}</td>
            <td>{u.email}</td>
            <td>{u.userType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};