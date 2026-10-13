import React, { useState } from 'react';
import type { Category } from '../types';
import { getStorageData, setStorageData } from '../utils/storage';

export const CategoryForm: React.FC<{ onCategoryAdded: () => void }> = ({ onCategoryAdded }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    const categories: Category[] = getStorageData('categories', []);
    const newCat: Category = { id: Date.now().toString(), name };
    setStorageData('categories', [...categories, newCat]);
    setName('');
    onCategoryAdded();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registrar Categoría</h3>
      <input type="text" placeholder="Nombre de la categoría" value={name} onChange={e => setName(e.target.value)} required />
      <button type="submit">Guardar Categoría</button>
    </form>
  );
};