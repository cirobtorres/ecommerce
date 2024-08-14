"use client";

import { RefrigelUser } from "@/types/user-types";

export const getDisplayName = (user: RefrigelUser) => {
  const displayName =
    user?.refrigel_users.user_type === "F"
      ? user.refrigel_users.display_name
      : user?.refrigel_users.company_data?.brand_name; // user_type = "J"
  return displayName;
};
