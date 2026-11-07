import { Routes as RouterRoutes, Route } from "react-router-dom";
/*
import Home from "./Components/Home";
import Admin from "./Components/Admin";
import CustomerManagement from "./Components/CustomerManagement";
import PlantHire from "./Components/PlantHire"
import CustomerEntry from "./Components/CustomerEntry.jsx";
*/
import Home from "./Components/Home";
import NewOrder from "./Components/NewOrder";
import CreateOrderLines from "./Components/CreateOrderLines.jsx";
import ManageOrders from "./Components/ManageOrders.jsx";
import NavBar from './Components/NavBar';



function AppRoutes() {
    return (
        <div className="Routes">

            <NavBar/>
            <RouterRoutes>
                <Route path="/" element={<Home />} />
                <Route path="/NewOrder" element={<NewOrder />} />
                <Route path="/CreateOrderLines" element={<CreateOrderLines />} />
                <Route path="/ManageOrders" element={<ManageOrders />} />
            </RouterRoutes>
        </div>
    );
}

export default AppRoutes;