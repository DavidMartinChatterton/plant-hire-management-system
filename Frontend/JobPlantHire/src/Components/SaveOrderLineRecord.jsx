import { useState } from "react";

export default function SaveOrderLineRecord({ 
    selectedOrderId, 
    orderLineName, 
    orderLineResource, 
    orderLineEmployee, 
    orderLineDate, 
    orderLineStatus, 
    orderLineUOM, 
    orderLineUnitPrice, 
    orderLineQty,
    // Add setters if you want to reset form fields after saving
    setOrderLineName,
    setOrderLineQty
}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    /* Submit the order line to the backend */
    async function handleSubmit(event) {
        event.preventDefault();
        setMessage("");

        /* Confirm an order is selected */
        if (!selectedOrderId) {
            setMessage("Please select an order first.");
            return;
        }

        const name = orderLineName ? orderLineName.trim() : "";
        if (!name) {
            setMessage("Please enter an order line name.");
            return;
        }
        
        setIsSubmitting(true);
        console.log("About to save order line for order:", selectedOrderId);

        try {
            const response = await fetch("/new-order-line", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    orderId: selectedOrderId,
                    orderLineName,
                    orderLineResource,
                    orderLineEmployee,
                    orderLineDate,
                    orderLineStatus,
                    orderLineUOM,
                    orderLineUnitPrice,
                    orderLineQty
                }),
            });

            let result;
            try {
                result = await response.json();
            } catch {
                throw new Error(
                    `Backend returned HTTP ${response.status}. Check the Flask terminal for details.`
                );
            }

            if (!response.ok) {
                throw new Error(result.error || `Request failed (${response.status}).`);
            }

            setMessage(result.message || "New order line created successfully.");
            
            // Optional: reset fields after successful save
            if (setOrderLineName) setOrderLineName("");
            if (setOrderLineQty) setOrderLineQty(0);

        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Could not add the order line. Check that the backend is running."
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Saving Line..." : "Save order Line"}
            </button>
            {message && <p style={{ marginTop: "8px", fontSize: "0.9rem" }}>{message}</p>}
        </div>
    );
}
