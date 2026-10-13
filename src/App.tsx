import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import { BooksPage } from './pages/BooksPage';
import { UsersPage } from './pages/UsersPage';
import { LoansPage } from './pages/LoansPage';
import { HistoryPage } from './pages/HistoryPage';
import heroImage from './assets/hero.png';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <Link className="brand" to="/">
            <img src={heroImage} alt="" />
            <span className="brand-copy">
              <strong>Biblioteca Central</strong>
              <span>Sistema universitario</span>
            </span>
          </Link>
          <span className="nav-label">Espacio de trabajo</span>
          <nav className="side-nav" aria-label="Navegación principal">
            <NavLink to="/" end><span className="nav-icon" aria-hidden="true">L</span>Libros</NavLink>
            <NavLink to="/users"><span className="nav-icon" aria-hidden="true">U</span>Usuarios</NavLink>
            <NavLink to="/loans"><span className="nav-icon" aria-hidden="true">P</span>Préstamos</NavLink>
            <NavLink to="/history"><span className="nav-icon" aria-hidden="true">H</span>Historial</NavLink>
          </nav>
          <div className="sidebar-note">
            <strong>Tu espacio de lectura</strong>
            <span>Organiza los recursos y acompaña el aprendizaje de toda la comunidad.</span>
          </div>
        </aside>
        <div className="app-main">
          <header className="topbar">
            <span className="topbar-label">Gestión de biblioteca</span>
            <div className="account-chip">
              <span className="account-avatar" aria-hidden="true">BC</span>
              Biblioteca
            </div>
          </header>
          <main className="page-content">
            <Routes>
              <Route path="/" element={<BooksPage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/loans" element={<LoansPage />} />
              <Route path="/history" element={<HistoryPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}