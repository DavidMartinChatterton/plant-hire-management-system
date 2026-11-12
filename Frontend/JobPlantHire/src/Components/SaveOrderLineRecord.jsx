import { useEffect, useState } from "react";

export default function SaveOrderLineRecord({ value, onChange }) {

    return (
        <button
            type="button"
            onClick={() => console.log("Save button clicked")}
        >
            Save order Line
        </button>
    );
}