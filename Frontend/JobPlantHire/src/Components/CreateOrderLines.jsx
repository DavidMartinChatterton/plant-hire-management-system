import { useEffect, useRef, useState } from "react";

export default function CreateOrderLines() {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [customerLoadError, setCustomerLoadError] = useState("");
  

  const [orders, setOrders] = useState([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [orderLoadError, setOrderLoadError] = useState("");
  /* for orders lookup */
  const [orderId, setOrderId] = useState("");
  const [orderNum, setOrderNum] = useState("");
  const [orderName, setOrderName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  /* For open order grid */
  const [selectedOrderId, setSelectedOrderId] = useState("");
  




  /* define line update elements */
  const [orderLineName, setOrderLineName] = useState("");
  const [orderLineResource, setOrderLineResource] = useState("");
  const [orderLineEmployee, setOrderLineEmployee] = useState("");
  const [orderLineQty, setOrderLineQty] = useState("");
  const [orderLineUnitPrice, setOrderLineUnitPrice] = useState("");
  const [orderLineStatus, setOrderLineStatus] = useState("");
  const [orderLineUOM, setOrderLineUOM] = useState("");
  const [orderLineDate, setOrderLineDate] = useState("");

  /*  For line grid control 
      Holds the order line dta returned from flask 
      for the line summary grid
  */
  const [orderLines, setOrderLines] = useState([]);
  const [isLoadingOrderLines, setIsLoadingOrderLines] = useState(false);
  const [orderLinesLoadError, setOrderLinesLoadError] = useState("");
  const orderLinesRequestId = useRef(0);

  
  /* for on-click event of customer dropdown */
  const handleCustomerChange = async (e) => {
    const selectedCustomerId = e.target.value;

    console.log("Customer selected:", selectedCustomerId); 
  


  };



  
  /* Get customers for lookup - start should this be a child component of CreateOderLines.jsx */
  useEffect(() => {
    async function loadCustomers() { 
      try {
        const response = await fetch("/customerList");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Request failed (${response.status}).`);
        }

        setCustomers(result.customers);
      } catch (error) {
        setCustomerLoadError(
          error instanceof Error ? error.message : "Could not load customers.",
        );
      } finally {
        setIsLoadingCustomers(false);
      }
    }

    loadCustomers();
  }, []);

  /* Load orders for selected customer into order level grid start --->*/
  useEffect(() => {

  if (!customerId) return;

  async function loadOrders() {
    console.log("Loading orders...");

    try {
      const response = await fetch(`/openOrdersForCustomer/${customerId}`
                                    
      );
      console.log("Status: ", response.status)
      const result = await response.json();
      
      console.log("Result: ", result);

      if (!response.ok) {
        throw new Error(
          result.error || `Request failed (${response.status}).`
        );
      }

      setOrders(result.orders);
      console.log(result.orders);

    } catch (error) {
      setOrderLoadError(
        error instanceof Error
          ? error.message
          : "Could not load orders."
      );
    } finally {
      setIsLoadingOrders(false);
    }
  }
  loadOrders();
}, [customerId]);
  /* Load orders for selected customer into order level grid End< <---*/

  /* Submit the order lime  to the backend start */
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    /* confirm an order is selected from grid */
    if (!selectedOrderId) {
        setMessage("Please select an order.");
        return;
    }
    /* log event */
    console.log("Creating line for order:", selectedOrderId);
    const name = orderLineName.trim();

    console.log("orderName =", orderLineName);
    if (!name) {
      setMessage("Enter order name again.");
      return;
    }
    
    setIsSubmitting(true);
    console.log("About to save order line");
    try {
      const response = await fetch("/new-order-line", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderId: selectedOrderId,
          orderLineName: orderLineName,
          orderLineResource: orderLineResource,
          orderLineEmployee, orderLineEmployee,
          orderLineDate: orderLineDate,
          orderLineStatus: orderLineStatus,
          orderLineUOM: orderLineUOM,
          orderLineUnitPrice: orderLineUnitPrice,
          orderLineQty: orderLineQty
        }),
      });
      let result;
      console.log("Response received");
      try {
        result = await response.json();
      } catch {
        throw new Error(
          `Backend returned HTTP ${response.status}. Check the Flask terminal for details.`,
        );
      }

      if (!response.ok) {
        throw new Error(result.error || `Request failed (${response.status}).`);
      }

      setMessage(result.message || "New order created successfully.");
      setOrderName("");
      setCustomerId("");
      setOrderLineDate("");
      setOrderNotes("");
      setOrderStatus("");
      setOrderLineQty(0);

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not add the order. Check that the backend is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
    /* Submit the order to the backend  end */
  }

  /* Load order lines for selected order */
async function loadOrderLines(orderId) {
  const requestId = ++orderLinesRequestId.current;
  setIsLoadingOrderLines(true);
  setOrderLines([]);
  setOrderLinesLoadError("");
  try {
    const response = await fetch(`/selectedOrderLines/${orderId}`);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.error || `Request failed (${response.status}).`
      );
    }

    if (!Array.isArray(result.orderLines)) {
      throw new Error("The server response did not contain an orderLines list.");
    }

    if (requestId !== orderLinesRequestId.current) return;
    setOrderLines(result.orderLines);
  } catch (error) {
    if (requestId === orderLinesRequestId.current) {
      setOrderLinesLoadError(
        error instanceof Error ? error.message : "Could not load order lines."
      );
    }
  } finally {
    if (requestId === orderLinesRequestId.current) {
      setIsLoadingOrderLines(false);
    }
  }
}
/* Load order lines for selected order into line level grid End< <---*/

  
    /* Render the new-order form - start */
  
  return (
    <form onSubmit={handleSubmit}>
        <h2>Enter order lines</h2> <br></br> 

        <div>
            <label htmlFor="customerId">Customer:</label>
            <select
              id="customerId"
              name="customerId"
              value={customerId}
              onChange={(event) => setCustomerId(event.target.value)}
              disabled={isLoadingCustomers || Boolean(customerLoadError)}
              required
            >
              <option value="">
                {isLoadingCustomers ? "Loading customers..." : "Select a customer"}
              </option>
              {customers.map((customer) => (
                <option key={customer.customerId} value={customer.customerId}>
                  {customer.customerName}
                </option>
              ))}
            </select>
            {customerLoadError && <p role="alert">{customerLoadError}</p>}
        </div>
        
        {/* Order grid control */}
        <div>
          <label>Orders:</label>

              {isLoadingOrders ? (
                  <p>Loading orders...</p>
              ) : (
                  <table
                      style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          marginTop: "10px"
                      }}
                  >
                      <thead>
                          <tr>
                              <th>Order No</th>
                              <th>Order Name</th>
                              <th>Order Date</th>
                              <th>Status</th>
                          </tr>
                      </thead>

                      <tbody>
                          {orders.map((order) => (
                              <tr
                                  key={order.orderId}
                                  onClick={() => {
                                      setSelectedOrderId(order.orderId);
                                      loadOrderLines(order.orderId)
                                      setOrderId(order.orderId);
                                      console.log(order.orderId)
                                      
                                  }}
                                  style={{
                                      cursor: "pointer",
                                      backgroundColor:
                                          selectedOrderId === order.orderId
                                              ? "#dbeafe"
                                              : "white"
                                  }}
                              >
                                  <td>{order.orderNum}</td>
                                  <td>{order.orderName}</td>
                                  <td>{order.orderDate}</td>
                                  <td>{order.orderStatus}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          </div>
          
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

          <div>
            <label htmlFor="orderLineResoure">Order line resource: </label>
            <input
            id="orderLineResource"
            name="orderLineResource"
            type="text"
            autoComplete="name"
            
            value={orderLineResource}
            onChange={(event) => setOrderLineResource(event.target.value)}
            />
          </div>
        
         <div>
            <label htmlFor="orderLineEmployee">Order line employee: </label>
            <input
            id="orderLineEmployee"
            name="orderLineEmployee"
            type="text"
            autoComplete="name"
          
            value={orderLineEmployee}
            onChange={(event) => setOrderLineEmployee(event.target.value)}
            />
          </div>

         

           <div>
            <label htmlFor="OrderLineDate">Order line date:</label>
            <input
            id="OrderLineDate"
            name="OrderLineDate"
            type="date"
            autoComplete="date"
            value={orderLineDate}
            onChange={(event) => setOrderLineDate(event.target.value)}
            required
            />

            <div>
            <label htmlFor="orderLineStatus">Order line status: </label>
            <input
            id="orderLineStatus"
            name="orderLineStatus"
            type="text"
            autoComplete="name"
            placeholder="Select line status"
            value={orderLineStatus}
            onChange={(event) => setOrderLineStatus(event.target.value)}
            />
          </div>

           <div>
            <label htmlFor="orderLineUOM">Order line unit of measure: </label>
            <input
            id="orderLineUOM"
            name="orderLineUom"
            type="text"
            autoComplete="name"
            placeholder="Enter UOM"
            value={orderLineUOM}
            onChange={(event) => setOrderLineUOM(event.target.value)}
            />
          </div>

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
        {/* Order lines grid control */}
        <div>
          <label><h3>Orders Lines:</h3></label>

              {isLoadingOrderLines ? (
                  <p>Loading order lines...</p>
              ) : orderLinesLoadError ? (
                  <p role="alert">{orderLinesLoadError}</p>
              ) : !selectedOrderId ? (
                  <p>Select an order to view its lines.</p>
              ) : (
                  <table
                      style={{
                          width: "100%",
                          borderCollapse: "collapse",
                          marginTop: "10px"
                      }}
                  >
                      <thead>
                          <tr>
                              <th>Line name</th>
                              <th>Unit cost</th>
                              <th>Quantity</th>
                              <th>Total</th>
                          </tr>
                      </thead>

                      <tbody>
                          {orderLines.length === 0 ? (
                              <tr>
                                  <td colSpan="4">No order lines found for this order.</td>
                              </tr>
                          ) : orderLines.map((orderLine) => (
                              <tr
                                  key={orderLine.orderlineTableId}
                              >
                                  {/* These fields must be an exact match to Flask */}
                                  <td>{orderLine.orderLineName}</td>
                                  <td>{orderLine.unitCost}</td>
                                  <td>{orderLine.qty}</td>
                                  <td>{orderLine.totalCost}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              )}
          </div>
          
        </div>
        


      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Create new order Line"}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
   /* Render the new-order form - end  */
}

    