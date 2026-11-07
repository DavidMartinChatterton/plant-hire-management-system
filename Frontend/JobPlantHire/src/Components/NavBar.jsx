import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
        <nav className="main-nav">
            <Link to='/NewOrder'> New Order </Link>
            <Link to='/CreateOrderLines'> Order Lines </Link>
            <Link to='/ManageOrders'> Manage orders </Link>
           
          

        </nav>
    </div>
  )
}

export default NavBar