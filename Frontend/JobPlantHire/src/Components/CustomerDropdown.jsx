import { useEffect, useState } from "react";
          
export default function CustomerDropdown( {value, onChange}) {
  
 
  const [customers, setCustomers] = useState([]);
  const [isLoadingCustomers, setIsLoadingCustomers] = useState(true);
  const [customerLoadError, setCustomerLoadError] = useState("");

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
return( 
<div>
            <label htmlFor="customerId">Customer:</label>
            <select
              id="customerId"
              name="customerId"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={isLoadingCustomers || Boolean(customerLoadError)}
              required
            >
              <option value="">
                {isLoadingCustomers ? "Loading customers..." : "from CustomerDropdown"}
              </option>
              {customers.map((customer) => (
                <option key={customer.customerId} value={customer.customerId}>
                  {customer.customerName}
                </option>
              ))}
            </select>
            {customerLoadError && <p role="alert">{customerLoadError}</p>}
        </div>
    
)
}