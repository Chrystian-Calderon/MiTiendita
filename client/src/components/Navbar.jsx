import { Link, useNavigate } from 'react-router';
import { BarChart3, LogOut, Menu, Package, PieChart, Settings, Users, ShoppingCart, TrendingUp, Utensils } from "lucide-react"

const Navigation = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem('auth')
    navigate('/')
  }

  return (
    <nav className='navbar'>
      <h1>Mi Tiendita</h1>
      <ul>
        <li>
          <Link to="/dashboard"><BarChart3 />Dashboard</Link>
        </li>
        <li>
          <Link to="/products"><Package />Productos</Link>
        </li>
        <li>
          <Link to="/shopping"><TrendingUp />Compras</Link>
        </li>
        <li>
          <Link to="/dishes"><Utensils />Platos</Link>
        </li>
        <li>
          <Link to="/sales"><ShoppingCart />Ventas</Link>
        </li>
      </ul>
      <button onClick={handleLogout}><LogOut />Cerrar Sesión</button>
    </nav>
  )
}

export default Navigation;