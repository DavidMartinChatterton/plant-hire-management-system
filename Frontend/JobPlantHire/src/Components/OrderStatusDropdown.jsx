import { useEffect, useState } from "react";
          
export default function OrderStatusDropdown( {value, onChange}) {
  
 
  const [orderStatus, setOrderStatus] = useState([]);
  const [isLoadingOrderStatus, setIsLoadingOrderStatus] = useState(true);
  const [orderStatusLoadError, setOrderStatusLoadError] = useState("");

   /* Get customers for lookup - start */
  useEffect(() => {
    async function loadOrderStatus() { 
       
      try {
        const response = await fetch("/orderStatusList");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Request failed (${response.status}).`);
        }
        
        setOrderStatus(result.orderStatusList); /* This is received fomer Flask an must be the same as Flask */

      } catch (error) {
        setOrderStatusLoadError(
          error instanceof Error ? error.message : "Could not load Status list.",
        );
      } finally {
        setIsLoadingOrderStatus(false);
      }
    }

    loadOrderStatus();
  }, []);
  
/* Get Order status for lookup - end*/
return( 
<div>
            <label htmlFor="orderStatus">OrderStatus:</label>
            <select
              id="orderStatusId"
              name="orderStatusId"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={isLoadingOrderStatus || Boolean(orderStatusLoadError)}
              required
            >
              <option value="">
                {isLoadingOrderStatus ? "Loading Order Status..." : "from OrderStatusDropdown"}
              </option>
              {orderStatus.map((orderStatus) => (
                <option key={orderStatus.orderStatusTableId} value={orderStatus.orderStatusTableId}>
                  {orderStatus.description}
                </option>
              ))}
            </select>
            {orderStatusLoadError && <p role="alert">{orderStatusLoadError}</p>}
        </div>
    
)
}