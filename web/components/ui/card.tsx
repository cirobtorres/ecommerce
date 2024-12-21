const Card = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const CardContent = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={className ? className : ""}>{children}</div>;
};

export { Card, CardContent };
