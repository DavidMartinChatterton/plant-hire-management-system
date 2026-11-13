import { useState } from "react";

export default function Accordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "▼ Order lines summary" : "► Order lines summary"}
       
      </button>
 {isOpen && (
        <div>
          There will be a summary grid here soon
        </div>
      )}
    </div>
  );
  
}