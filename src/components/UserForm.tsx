import React, { useState } from 'react';
import type { User, UserType } from '../types';
import { getStorageData, setStorageData } from '../utils/storage';

export const UserForm: React.FC<{ onUserAdded: () => void }> = ({ onUserAdded }) => {
  const [fullName, setFullName] = useState('');
  const [universityCode, setUniversityCode] = useState('');
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('Estudiante');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const users: User[] = getStorageData('users', []);
    if (users.some(u => u.universityCode === universityCode)) {
      setError('El código universitario ya se encuentra registrado.');
      return;
    }

    const newUser: User = { id: Date.now().toString(), fullName, universityCode, email, userType };
    setStorageData('users', [...users, newUser]);
    setFullName(''); setUniversityCode(''); setEmail(''); setError(null);
    onUserAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registro de Usuario</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="text" placeholder="Nombres y Apellidos" value={fullName} onChange={e => setFullName(e.target.value)} required />
      <input type="text" placeholder="Código Universitario" value={universityCode} onChange={e => setUniversityCode(e.target.value)} required />
      <input type="email" placeholder="Correo Electrónico" value={email} onChange={e => setEmail(e.target.value)} required />
      <select value={userType} onChange={e => setUserType(e.target.value as UserType)}>
        <option value="Estudiante">Estudiante</option>
        <option value="Docente">Docente</option>
      </select>
      <button type="submit">Registrar Usuario</button>
    </form>
  );
};