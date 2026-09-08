import { Link, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to="/dashboard/profile">Profile</Link> {' | '}
      <Link to="/dashboard/settings">Settings</Link>
      <Outlet />
    </div>
  );
}

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;
