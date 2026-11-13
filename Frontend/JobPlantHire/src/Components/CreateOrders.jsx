import { useEffect, useState } from "react";
import OrderLinesAccordion from "./OrderLinesAccordion";
import CustomerDropdown from "./CustomerDropdown";
import OrderStatusDropdown from "./OrderStatusDropdown";
import LineGridAccordian from "./LineGridAccordion";

export default function CreateOrders() {
  const [orderName, setOrderName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [OrderDate, setOrderDate] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [orderStatusId, setOrderStatusId] = useState("");
  const [selectedOrderId, setOrderId] = useState(null);

  /* Submit the order to the backend start */
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const name = orderName.trim();
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
          customerId: customerId,     /* From CustomerDropdown */ 
          orderDate: OrderDate,
          orderNotes: orderNotes,
          orderStatus: orderStatusId  /* from OrderStatusDropdown */
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

      // 1. Log the full response object to verify keys returned from Flask
      console.log("Full backend response object:", result);

      // 2. Extract and assign the foreign key using correct variable name (fixed typo)
      const newOrderId = result.orderId;
      setOrderId(newOrderId);

      // 3. Optional debug logs
      console.log("Newly assigned order ID:", newOrderId);
      
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not add the order. Check that the backend is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /* Render the new-order form - start */
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="orderName">Order name: </label>
        <input
          id="orderName"
          name="orderName"
          type="text"
          autoComplete="name"
          placeholder="Enter order name"
          value={orderName}
          onChange={(event) => setOrderName(event.target.value)}
        />
      </div>

      <CustomerDropdown value={customerId} onChange={setCustomerId}/>           
      <OrderStatusDropdown value={orderStatusId} onChange={setOrderStatusId}/>  

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

      {/* Render the accordion and pass down the active primary key as a foreign key */}
      <OrderLinesAccordion selectedOrderId={selectedOrderId} />
      <LineGridAccordian  selectedOrderId={selectedOrderId}/>
      
      
       
    </form>
  );
}