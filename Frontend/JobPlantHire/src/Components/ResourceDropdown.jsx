import { useEffect, useState } from "react";
          
export default function resourceDropdown( {value, onChange}) {
  
 
  const [resource, setResource] = useState([]);
  const [isLoadingResource, setIsLoadingResource] = useState(true);
  const [resourceLoadError, setReourceLoadError] = useState("");

   /* Get redources for lookup - start */
  useEffect(() => {
    async function loadResource() { 
       
      try {
        const response = await fetch("/resourceList");
        {}
        
        const result = await response.json(); 

        if (!response.ok) {
          throw new Error(result.error || `Request failed (${response.status}).`);
        }
        
        setResource(result.resourceList); /* This is received from Flask an must be the same as Flask */

      } catch (error) {
        setReourceLoadError(
          error instanceof Error ? error.message : "Could not resources.",
        );
      } finally {
        setIsLoadingResource(false);
      }
    }

    loadResource();
  }, []);
  
/* Get resource for lookup - end*/
return( 
<div>
            <label htmlFor="resource">Resource:</label>
            <select
              id="resourceId"
              name="resourceId"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={isLoadingResource || Boolean(resourceLoadError)}
              required
            >
            
              <option value="">
                {isLoadingResource ? "Loading resources..." : "from Resource Dropdown"}
              </option>
              {resource.map((resource) => (
                <option key={resource.resourceTableId} value={resource.resourceTableId}>
                  {resource.resourceDescription}
                </option>
              ))}
            </select>
            {resourceLoadError && <p role="alert">{resourceLoadError}</p>}
        </div>
    
)
}