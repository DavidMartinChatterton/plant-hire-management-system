import { useState } from "react";

export default function CustomerEntry() {
  const [customerName, setCustomerName] = useState("");
  
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [addressThree, setAddressThree] = useState("");
  const [postCode, setPostCode] = useState("");
  const [active, setActive] = useState(1);


  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const nameValue = customerName.trim();
    const phoneValue = phoneNumber.trim();
    const emailValue = email.trim();
    const addressOneValue = addressOne.trim();
    const addressTwoValue = addressTwo.trim();
    const addressThreeValue = addressThree.trim();
    const postCodeValue = postCode.trim();
    const activeValue = active;

    if (!nameValue) {
      setMessage("Enter a customer name.");
      return;
    }
    /*This is the element that links to Python*/
    setIsSubmitting(true);
    try {
      const response = await fetch("/add-customer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          customerName: nameValue, 
          phoneNumber: phoneValue,
          email: emailValue,
          addressOne: addressOneValue,
          addressTwo: addressTwoValue,
          addressThree: addressThreeValue,
          postCode: postCodeValue,
          active: activeValue,
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

      setMessage(result.message || "Customer added successfully.");
      setCustomerName("");
      setPhoneNumber("");
      setEmail("");
      setAddressOne("");
      setAddressTwo("");
      setAddressThree("");
      setPostCode("");
      setActive("");

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
      <div>
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
      </div>
    
      <div>
        <label htmlFor="phoneNumber">Phone number:</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
          required
        />

      </div>
      <div>
        <label htmlFor="email">Email address:</label>
        <input
          id="email"
          name="email"
          type="text"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

      </div>

      <div>
        <label htmlFor="addressOne">Address line one:</label>
        <input
          id="addressOne"
          name="addressOne"
          type="text"
          autoComplete="addressOne"
          value={addressOne}
          onChange={(event) => setAddressOne(event.target.value)}
          required
        />

      </div>

       <div>
        <label htmlFor="addressTwo">Address line two:</label>
        <input
          id="addressTwo"
          name="addressTwo"
          type="text"
          autoComplete="addressTwo"
          value={addressTwo}
          onChange={(event) => setAddressTwo(event.target.value)}
          required
        />

      </div>

      <div>
        <label htmlFor="addressThree">Address line three:</label>
        <input
          id="addressThree"
          name="addressThree"
          type="text"
          autoComplete="addressThree"
          value={addressThree}
          onChange={(event) => setAddressThree(event.target.value)}
          required
        />

      </div>

      <div>
        <label htmlFor="postCode">Postcode:</label>
        <input
          id="postCode"
          name="postCode"
          type="text"
          autoComplete="postCode"
          value={postCode}
          onChange={(event) => setPostCode(event.target.value)}
          required
        />

      </div>

        <div>
        <label htmlFor="active">Active customer:</label>
        <input
          id="active"
          name="active"
          type="checkbox"
          checked={active}
          onChange={(event) => setActive(event.target.checked)}
          required
        />

      </div>
      
      <p>Customer name: {customerName}</p> <br></br>
     

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Adding..." : "Add customer"}
      </button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

    