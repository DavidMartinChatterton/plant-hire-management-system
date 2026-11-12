import { useEffect, useState } from "react";
          
export default function LineStatusDropdown({ value, onChange }) {
  
 
  const [lineStatus, setlineStatus] = useState([]);
  const [isLoadinglineStatus, setIsLoadinglineStatus] = useState(true);
  const [lineStatusLoadError, setlineStatusLoadError] = useState("");

   /* Get customers for lookup - start */
  useEffect(() => {
    async function loadlineStatus() { 
       
      try {
        const response = await fetch("/lineStatusList");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || `Request failed (${response.status}).`);
        }
        
        setlineStatus(result.lineStatusList); /* This is received fomer Flask an must be the same as Flask */

      } catch (error) {
        setlineStatusLoadError(
          error instanceof Error ? error.message : "Could not load Status list.",
        );
      } finally {
        setIsLoadinglineStatus(false);
      }
    }

    loadlineStatus();
  }, []);
  
/* Get line status for lookup - end*/
return( 
<div>
            <label htmlFor="lineStatus">lineStatus:</label>
            <select
              id="lineStatusId"
              name="lineStatusId"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={isLoadinglineStatus || Boolean(lineStatusLoadError)}
              required
            >
              <option value="">
                {isLoadinglineStatus ? "Loading line Status..." : "from lineStatusDropdown"}
              </option>
              {lineStatus.map((status) => (
                <option key={status.orderStatusTableId} value={status.orderStatusTableId}>
                  {status.description}
                </option>
              ))}
            </select>
            {lineStatusLoadError && <p role="alert">{lineStatusLoadError}</p>}
        </div>
    
)
}