import { Routes as RouterRoutes, Route } from "react-router-dom";

import Home from "./Components/Home";
import CreateOrders from "./Components/CreateOrders.jsx";
import CreateOrderLines from "./Components/CreateOrderLines.jsx";
import ManageOrders from "./Components/ManageOrders.jsx";
import NavBar from './Components/NavBar';

function AppRoutes() {
    return (
        <div className="Routes">

            <NavBar/>
            <RouterRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/CreateOrders" element={<CreateOrders />} />
                <Route path="/ManageOrders" element={<ManageOrders />} />
            </RouterRoutes>
        </div>
    );
}

export default AppRoutes;