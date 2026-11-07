import { useEffect, useState } from "react";

export default function PlantHire() {
  const [machineHireName, setMachineHireName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [customerLoadError, setCustomerLoadError] = useState("");
  const [HireDate, setHireDate] = useState("");

  /* this is where the list of customers is populated */
  useEffect(() => {
    async function loadCustomers() {
      try {
        const response = await fetch("/customers");
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

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const name = machineHireName.trim();
    if (!name) {
      setMessage("Enter Plant hire name");
      return;
    }
    /*This is the element that links to Pyton*/
    setIsSubmitting(true);
    try {
      const response = await fetch("/new-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          machineHireName: name,
          customerId,
          HireDate: Hireate,
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

      setMessage(result.message || "New machube hire created successfully.");
      setOrderName("");
      setCustomerId("");
      setHireDate("");

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not add the hirw record. Check that the backend is running.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="MachineHireName">Machine hire name : </label>
            <input
            id="MachineHireName"
            name="MachineHireName"
            type="text"
            autoComplete="name"
            placeholder="Enter hire name"
            value={machineHireName}
            onChange={(event) => setMachineHireName(event.target.value)}
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
            <label htmlFor="HireDate">Hire Date:</label>
            <input
            id="HireDate"
            name="HireDate"
            type="date"
            autoComplete="date"
            value={HireDate}
            onChange={(event) => setOrderDate(event.target.value)}
            required
            />
        </div>
      <p>Order name: {machineHireName}</p> <br></br>
      <p>Customer ID: {customerId}</p> <br></br>
      <p>Hire date: {HireDate}</p> <br></br>
     

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Create new order"}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

    