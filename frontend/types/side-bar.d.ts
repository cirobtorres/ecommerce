type UserSideBarItemsProps = {
  title: string;
  href: string;
  icon?: any;
  submenu?: boolean;
  subMenuItems?: { title: string; href: string; icon?: any }[];
  separation?: boolean;
};
