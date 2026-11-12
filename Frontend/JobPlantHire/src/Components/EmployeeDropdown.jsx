import { useEffect, useState } from "react";
          
export default function EmployeeDropdown( {value, onChange}) {
  
 
  const [employee, setEmployee] = useState([]);
  const [isLoadingEmployee, setIsLoadingEmployee] = useState(true);
  const [employeeLoadError, setEmployeeLoadError] = useState("");

   /* Get employees for lookup - start */
  useEffect(() => {
    async function loadEmployee() { 
       
      try {
        const response = await fetch("/employeeList");
        const result = await response.json(); 

        if (!response.ok) {
          throw new Error(result.error || `Request failed (${response.status}).`);
        }
        
        setEmployee(result.employeeList); /* This is received from Flask an must be the same as Flask */

      } catch (error) {
        setEmployeeLoadError(
          error instanceof Error ? error.message : "Could not load employees.",
        );
      } finally {
        setIsLoadingEmployee(false);
      }
    }

    loadEmployee();
  }, []);
  
/* Get employees for lookup - end*/
return( 
<div>
            <label htmlFor="employee">Employee:</label>
            <select
              id="employeeId"
              name="employeeId"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              disabled={isLoadingEmployee || Boolean(employeeLoadError)}
              required
            >
            
              <option value="">
                {isLoadingEmployee ? "Loading employee..." : "from Employee Dropdown"}
              </option>
              {employee.map((employee) => (
                <option key={employee.employeeTableId} value={employee.employeeTableId}>
                  {employee.name}
                </option>
              ))}
            </select>
            {employeeLoadError && <p role="alert">{employeeLoadError}</p>}
        </div>
    
)
}