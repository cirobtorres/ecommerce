type AuthContextProps = {}

type FieldProps = {
    type: 'text' | 'email' | 'password'
    id: string
    label: string
}

type ProductCardProps = {
    title: string;
    image: string;
    units: number;
    fullPrice: number;
    discountPrice: number;
    discountRate: number;
    installmentNumber: number;
    installmentValue: number;
};

type ThemeContextProps = {
    theme: "light" | "dark" | null,
    alternateTheme: () => void,
};