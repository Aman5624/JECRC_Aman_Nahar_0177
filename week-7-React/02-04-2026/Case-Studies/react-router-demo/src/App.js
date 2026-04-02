import {BrowserRouter as Router, Routes, Route, BrowserRouter, NavLink} from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';

function App() {
  return (
    <BrowserRouter>
    <nav style={Styles.nav}>
      <NavLink to="/" style={Styles.link} end>
        Home
      </NavLink>
      <NavLink to="/about" style={Styles.link}>
        About
      </NavLink>
      <NavLink to="/contact" style={Styles.link}>
        Contact
      </NavLink>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
    </BrowserRouter>
  );
}

const Styles = {
  nav: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: '10px',
  },
  link: ({ isActive }) => ({
    color: isActive ? 'red' : 'black',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : 'normal',
  }),
};


export default App;
