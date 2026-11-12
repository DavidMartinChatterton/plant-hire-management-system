import { useState } from "react";

export default function App() {
  const [customerName, setCustomerName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const name = customerName.trim();
    if (!name) {
      setMessage("Enter a customer name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/add-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerName: name }),
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

      setMessage(result.message || "Customer added successfully.");
      setCustomerName("");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not add the customer. Check that the backend is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="customerName">Customer name: </label>
      <input
        id="customerName"
        name="customerName"
        type="text"
        autoComplete="name"
        placeholder="Enter customer name"
        value={customerName}
        onChange={(event) => setCustomerName(event.target.value)}
      />

      <p>Customer name: {customerName}</p>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add customer"}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

    