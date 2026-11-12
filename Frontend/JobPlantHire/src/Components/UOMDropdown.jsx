import { useEffect, useState } from "react";
          
export default function UOMDropdown( {value, onChange}) {
  
 
  const [UOM, setUOM] = useState([]);
  const [isLoadingUOM, setIsLoadingUOM] = useState(true);
  const [UOMLoadError, setUOMLoadError] = useState("");

   /* Get UOM for lookup - start */
  useEffect(() => {
    async function loadUOM() { 
       
      try {
        const response = await fetch("/UOMList");

        const result = await response.json(); 

        if (!response.ok) {
          throw new Error(result.error || `Request failed (${response.status}).`);
        }
        
        setUOM(result.UOMList); /* This is received from Flask an must be the same as Flask */

      } catch (error) {
        setUOMLoadError(
          error instanceof Error ? error.message : "Could not UOMs.",
        );
      } finally {
        setIsLoadingUOM(false);
      }
    }

    loadUOM();
  }, []);
  
/* Get UOM for lookup - end*/
return( 
<div>
            <label htmlFor="UOM">UOM:</label>
            <select
              id="UOMId"
              name="UOMId"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={isLoadingUOM || Boolean(UOMLoadError)}
              required
            >
            
              <option value="">
                {isLoadingUOM ? "Loading UOMs..." : "from UOM Dropdown"}
              </option>
              {UOM.map((UOM) => (
                <option key={UOM.measureUnitTableId} value={UOM.measureUnitTableId}>
                  {UOM.longName}
                </option>
              ))}
            </select>
            {UOMLoadError && <p role="alert">{UOMLoadError}</p>}
        </div>
    
)
}