import { Routes, Route, Link, Outlet, useNavigate } from 'react-router-dom';

function Navbar() {
  return <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>;
}

function Home() { return <h1>Home Page</h1>; }
function About() { return <h1>About Page</h1>; }

function Contact() {
  const navigate = useNavigate();
  function sendMessage(e) {
    e.preventDefault();
    navigate('/');
  }
  return <div>
    <h1>Contact Page</h1>
    <form onSubmit={sendMessage}>
      <input placeholder="Your message" />
      <button type="submit">Send Message</button>
    </form>
  </div>;
}

function Dashboard() {
  return <div>
    <h1>Dashboard</h1>
    <Link to="profile">Profile</Link>{' | '}
    <Link to="settings">Settings</Link>
    <Outlet />
  </div>;
}

function Profile() { return <h2>Profile Page</h2>; }
function Settings() { return <h2>Settings Page</h2>; }

export default function App() {
  return <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  </>;
}
