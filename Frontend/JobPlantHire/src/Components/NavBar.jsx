import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div>
        <nav className="main-nav">
            <Link to='/CreateOrders'> Create orders </Link>
            <Link to='/ManageOrders'> Manage orders </Link>
           
          

        </nav>
    </div>
  )
}

export default NavBar