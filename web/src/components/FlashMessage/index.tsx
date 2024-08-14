export default function FlashMessage({
  children,
  type = "warning",
}: {
  children: React.ReactNode;
  type?: "warning" | "info";
}) {
  return (
    <div
      className="w-full px-4 py-2 rounded"
      style={{
        border:
          type === "warning"
            ? "1px solid #ef4444"
            : type === "info"
              ? "1px solid #3b82f6"
              : "",
        background:
          type === "warning" ? "#fee2e2" : type === "info" ? "#dbeafe" : "",
      }}
    >
      <p
        className="text-xs text-center"
        style={{
          color:
            type === "warning" ? "#ef4444" : type === "info" ? "#3b82f6" : "",
        }}
      >
        {children}
      </p>
    </div>
  );
}
