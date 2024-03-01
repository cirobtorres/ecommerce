import { FieldContextProvider } from "@/contexts/FieldContext";

export default function Field({ children }: { children: React.ReactNode }) {
  return (
    // This component is intended to be nested inside a flex container
    <FieldContextProvider>
      <div className="flex h-full w-full flex-col">{children}</div>
    </FieldContextProvider>
  );
}
