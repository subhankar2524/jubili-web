"use client";

import { toast } from "react-toastify";

export default function ExampleButton() {
  return (
    <button onClick={() => toast.success("Success message!")}>
      Show Toast
    </button>
  );
}
