type AuthContextProps = {};

type ProductCardProps = {
  title: string;
  image: string;
  units: number;
  fullPrice: number;
  discountPrice: number;
  discountRate: number;
  installmentNumber: number;
  // installmentValue: number;
};

type UserSideBarItemsProps = {
  title: string;
  href: string;
  icon?: any;
  submenu?: boolean;
  subMenuItems?: { title: string; href: string; icon?: any }[];
  separation?: boolean;
};

type NavButtonProps = {
  icon: any;
  onClick: (direction: number) => void;
  navTo: "forward" | "backward";
};
