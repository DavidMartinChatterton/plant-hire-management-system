import { useState } from "react";
import ResourceDropdown from "./ResourceDropdown.jsx";
import EmployeeDropdown from "./EmployeeDropdown.jsx";
import UOMDropdown from "./UOMDropdown.jsx";
import LineStatusDropdown from "./LineStatusDropdown.jsx";
import SaveOrderLineRecord from "./SaveOrderLineRecord";

export default function OrderLinesAccordion() {
const [isOpen, setIsOpen] = useState(false);

  /* define line update elements */
  const [orderLineName, setOrderLineName] = useState("");
  const [orderLineQty, setOrderLineQty] = useState("");
  const [orderLineUnitPrice, setOrderLineUnitPrice] = useState("");
  const [lineStatusId, setLineStatusId] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [UOMId, setUOMId] = useState("")



  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "▼ Order Lines" : "► Order Lines"}
        
      </button>

      {isOpen && (
        <div>
          <p>Order line entry</p>
           <div>
            <label htmlFor="orderLineName">Order line name: </label>
            <input
            id="orderLineName"
            name="orderLineName"
            type="text"
            autoComplete="name"
            placeholder="Enter order line name"
            value={orderLineName}
            onChange={(event) => setOrderLineName(event.target.value)}
            />
   
          </div>
            <ResourceDropdown   value={resourceId}      onChange={setResourceId}/>      {/* Get value for ResourceDropdown component */}
            <EmployeeDropdown   value={employeeId}      onChange={setEmployeeId}/>      {/* Get value for EmployeeDropdown component */}
            <UOMDropdown        value={UOMId}           onChange={setUOMId}/>           {/* Get value for UOMDropdown component */}
            <LineStatusDropdown value={lineStatusId}    onChange={setLineStatusId}/>    {/* Get value form LinetatusDropdown component */}
            <div>
            <label htmlFor="orderLineUnitPrice">Unit price: </label>
            <input
            id="orderLineUnitPrice"
            name="orderLineUnitPrice"
            type="number"
            autoComplete="name"
            placeholder="Unit price"
            value={orderLineUnitPrice}
            onChange={(event) => setOrderLineUnitPrice(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="orderLineQty">Quantity: </label>
            <input
            id="orderLineQty"
            name="orderLineQty"
            type="number"
            autoComplete="name"
            placeholder="Quantity"
            value={orderLineQty}
            onChange={(event) => setOrderLineQty(event.target.value)}
            />
          </div>

          
           <SaveOrderLineRecord />  
        </div>

      )}
   
     
    </div>
  );
}