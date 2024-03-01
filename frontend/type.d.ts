type UserPops = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  birth: string;
  phone: string;
  policy: string;
  is_active: string;
  is_staff: string;
};

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

type CategoriesProps = {
  image: {
    src: string;
    alt: string;
  };
  title: string;
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

type FooterCompanyGridProps = {
  items: FooterCompanyItemsProps[];
};

type FooterCompanyItemsProps = {
  title: string;
  items: {
    href: string;
    text: string;
  }[];
};

type registerFormProps = {
  firstName: string;
  lastName: string | undefined;
  cpf: string;
  birthAt: string | undefined;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  privacyPolicy: "on" | "off" | boolean;
  message: string | undefined;
};

type updateFormProps = {
  firstName: string;
  lastName: string | undefined;
  cpf: string;
  birthAt: string | undefined;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  privacyPolicy: "on" | "off";
  message: string | undefined;
};

type loginFormProps = {
  loginInput: string;
  password: string;
};

type AuthContextProps = {
  user: UserPops | null;
  loading: boolean;
  login: (form: loginFormProps) => Promise<void>;
  logout: () => Promise<void>;
  register: (form: registerFormProps) => Promise<void>;
  update: (form: updateFormProps) => Promise<void>;
};
