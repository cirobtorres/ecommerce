"use client";

import { useFormStatus } from "react-dom";

export default function SubmitButton({
  text,
  width,
}: {
  text: string;
  width?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`p-4 ${
        width ? width : "w-80"
      } text-theme-01 bg-theme-07 rounded hover:shadow-dark outline-none ${
        pending ? "shadow-dark" : null
      }`}
      disabled={pending}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}

// For pending to work it must be exported to a component separated from its form
