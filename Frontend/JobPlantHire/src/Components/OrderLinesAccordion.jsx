import { useState } from "react";
import ResourceDropdown from "./ResourceDropdown.jsx";
import EmployeeDropdown from "./EmployeeDropdown.jsx";
import UOMDropdown from "./UOMDropdown.jsx";
import LineStatusDropdown from "./LineStatusDropdown.jsx";
import SaveOrderLineRecord from "./SaveOrderLineRecord";

export default function OrderLinesAccordion({ selectedOrderId }) {
  const [isOpen, setIsOpen] = useState(false);

  /* define line update elements */
  const [orderLineName, setOrderLineName] = useState("");
  const [orderLineQty, setOrderLineQty] = useState("");
  const [orderLineUnitPrice, setOrderLineUnitPrice] = useState("");
  const [lineStatusId, setLineStatusId] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [UOMId, setUOMId] = useState("");
  const [orderLineDate, setOrderLineDate] = useState("");

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

          <ResourceDropdown   value={resourceId}      onChange={setResourceId}/>      
          <EmployeeDropdown   value={employeeId}      onChange={setEmployeeId}/>      
          <UOMDropdown        value={UOMId}           onChange={setUOMId}/>           
          <LineStatusDropdown value={lineStatusId}    onChange={setLineStatusId}/>    

          <div>
            <label htmlFor="orderLineDate">Line date: </label>
            <input
              id="orderLineDate"
              name="orderLineDate"
              type="date"
              value={orderLineDate}
              onChange={(event) => setOrderLineDate(event.target.value)}
            />
          </div>

          <div>
            <label htmlFor="orderLineUnitPrice">Unit price: </label>
            <input
              id="orderLineUnitPrice"
              name="orderLineUnitPrice"
              type="number"
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
              placeholder="Quantity"
              value={orderLineQty}
              onChange={(event) => setOrderLineQty(event.target.value)}
            />
          </div>
           
          <SaveOrderLineRecord 
            selectedOrderId={selectedOrderId}
            orderLineName={orderLineName}
            orderLineResource={resourceId}
            orderLineEmployee={employeeId}
            orderLineDate={orderLineDate}
            orderLineStatus={lineStatusId}
            orderLineUOM={UOMId}
            orderLineUnitPrice={orderLineUnitPrice}
            orderLineQty={orderLineQty}
            setOrderLineName={setOrderLineName}
            setOrderLineQty={setOrderLineQty}
          />
        </div>
      )}
    </div>
  );
}