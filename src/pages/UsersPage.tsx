import React, { useState, useEffect } from 'react';
import type { User } from '../types';
import { getStorageData } from '../utils/storage';
import { UserForm } from '../components/UserForm';
import { UserList } from '../components/UserList';

export const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const loadUsers = () => setUsers(getStorageData('users', []));

  useEffect(() => { loadUsers(); }, []);

  return (
    <div className="container">
      <h1 className="page-heading">Gestión de usuarios</h1>
      <p className="page-description">Registra a estudiantes y docentes para administrar sus préstamos.</p>
      <section className="panel">
        <UserForm onUserAdded={loadUsers} />
      </section>
      <section className="panel">
        <h3>Usuarios registrados</h3>
        <div className="table-wrap"><UserList users={users} /></div>
      </section>
    </div>
  );
};