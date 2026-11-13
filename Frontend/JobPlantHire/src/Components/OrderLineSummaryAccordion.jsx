import { useState } from "react";

 return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "▼ Order Lines" : "► Order Lines"}
      </button>
    </div>
 )