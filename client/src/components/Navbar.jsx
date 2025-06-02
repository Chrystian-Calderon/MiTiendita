import { Link } from 'react-router';

const Navigation = () => {
  return (
    <nav className='navbar'>
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/products">Productos</Link>
        </li>
        <li>
          <Link to="/shopping">Compras</Link>
        </li>
        <li>
          <Link to="/dishes">Platos</Link>
        </li>
        <li>
          <Link to="/sales">Ventas</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation;