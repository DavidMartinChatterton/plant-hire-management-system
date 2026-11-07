import { useEffect, useState } from "react";

export default function NewOrder() {
  const [OrderName, setOrderName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [customerLoadError, setCustomerLoadError] = useState("");
  const [OrderDate, setOrderDate] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderStatus, setOrderStatus] = useState("");
 
  /* Get customers for lookup - start */
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
  
/* Get customers for lookup - end*/

/* Submit the order to the backend start */
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const name = OrderName.trim();
    if (!name) {
      setMessage("Enter order name.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/new-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          orderName: name,
          customerId,
          orderDate: OrderDate,
          orderNotes: orderNotes,
          orderStatus: orderStatus
        }),
      });
      let result;

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
      setOrderDate("");
      setOrderNotes("");
      setOrderStatus("");

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

        <div>
            <label htmlFor="OrderName">Order name: </label>
            <input
            id="OrderName"
            name="OrderName"
            type="text"
            autoComplete="name"
            placeholder="Enter order name"
            value={OrderName}
            onChange={(event) => setOrderName(event.target.value)}
            />
        </div>
    
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
            <label htmlFor="OrderDate">Order Date:</label>
            <input
            id="OrderDate"
            name="OrderDate"
            type="date"
            autoComplete="date"
            value={OrderDate}
            onChange={(event) => setOrderDate(event.target.value)}
            required
            />
        </div>

        <div>
            <label htmlFor="orderNotes">Order text:</label>
            <input
            id="orderNotes"
            name="orderNotes"
            type="text"
            value={orderNotes}
            onChange={(event) => setOrderNotes(event.target.value)}
            required
            />
        </div>

        <div>
            <label htmlFor="orderStatus">Order Statue:</label>
            <input
            id="orderStatus"
            name="orderStatus"
            type="text"
            value={orderStatus}
            onChange={(event) => setOrderStatus(event.target.value)}
            required
            />
        </div>
      <p>Order name: {OrderName}</p> <br></br>
      <p>Customer ID: {customerId}</p> <br></br>
      <p>Order name: {OrderDate}</p> <br></br>
      <p>Order description: {orderNotes}</p> <br></br>
      <p>Order description: {orderStatus}</p> <br></br>
     

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Create new order"}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
   /* Render the new-order form - end  */
}

    