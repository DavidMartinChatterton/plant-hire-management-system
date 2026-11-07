import { useEffect, useState } from "react";

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
  /* for on-click event of customer dropdown */
  const handleCustomerChange = async (e) => {
    const selectedCustomerId = e.target.value;

    console.log("Customer selected:", selectedCustomerId); 
  };



  
  /* Get customers for lookup - start should this be a child componwent of CreateOderLines.jsx */
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

  /* Get orders for lookup - start */
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


  /* Submit the order to the backend start */
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

        
        </div>
        


      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Create new order Line"}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
   /* Render the new-order form - end  */
}

    