import { Link } from 'react-router-dom'
import { useCartStore } from '../stores/useCartStore'
export default function Nav () {
  const  items  = useCartStore((state) => state)

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/counter">Counter</Link></li>
        <li><Link to="/notification">Notification</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/job-board">Job Board</Link></li>
        <li><Link to="/form">Form</Link></li>
        <li><Link to="/put-form">Put Form</Link></li>
        <span>cart items: {items.items.length}</span>
      </ul>
    </nav>
  )
}