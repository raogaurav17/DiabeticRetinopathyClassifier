import { Link, useLocation } from 'react-router-dom';
import '../styles.css';
function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="brand" to="/">DR Detection</Link>
        <div className="navbar-links">
          <Link 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
            to="/">
            Home
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/prediction' ? 'active' : ''}`} 
            to="/prediction">
            Predict
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/description' ? 'active' : ''}`} 
            to="/Description">
            Description
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;