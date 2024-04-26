type MenuItemsProps = {
  items: UserSideBarItemsProps[];
  userSubMenu: boolean;
  pathname: string;
  setUserSubMenu: (value: boolean) => void;
};

type UserSideBarItemsProps = {
  title: string;
  href?: string;
  icon?: any;
  submenu?: boolean;
  subMenuItems?: { title: string; href: string; icon?: any }[];
  separation?: boolean;
};
