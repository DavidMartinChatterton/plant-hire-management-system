

import { useEffect, useState } from "react";
import OrderLinesAccordion from "./OrderLinesAccordion";
import CustomerDropdown from "./CustomerDropdown";
import OrderStatusDropdown from "./OrderStatusDropdown";
import SaveOrderLineRecord from "./SaveOrderLineRecord";





export default function CreateOrders() {
  const [OrderName, setOrderName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [OrderDate, setOrderDate] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderStatusId, setOrderStatusId] = useState("");

  

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
          customerId: customerId,     /* From CustomerDropdown Line 130 */ 
          orderDate: OrderDate,
          orderNotes: orderNotes,
          orderStatus: orderStatusId  /* from OrderStatusDropdown Line 131*/
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
      setOrderStatusId("");

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
      <CustomerDropdown value={customerId} onChange={setCustomerId}/>           {/* Get value form CustomerDropdown component */}
      <OrderStatusDropdown value={orderStatusId} onChange={setOrderStatusId}/>  {/* Get value form OrderStatusDropdown component */}
      <div>
        <label htmlFor="OrderDate">Order date:</label>
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

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Create new order"}
      </button>
      {message && <p role="status">{message}</p>}

       <OrderLinesAccordion />
       
    </form>
  );
  /* Render the new-order form - end  */

}

