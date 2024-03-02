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
