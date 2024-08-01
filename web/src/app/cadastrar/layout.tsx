"use client";

import Body from "../../components/Body";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Body>{children}</Body>;
}
