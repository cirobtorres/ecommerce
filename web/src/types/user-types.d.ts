import { User } from "@supabase/supabase-js";

type PersonData = {
  id: string;
  refrigel_user_id?: string;
  display_name: string;
  full_name: string;
  cpf: string;
  rg: string | null;
  gender: string; // ENUM
  birth_date: string;
};

type AddressData = {
  id: string;
  refrigel_user_id?: string;
  street: string;
  number: string;
  district: string;
  city: string;
  zip_code: string;
  place: string;
  is_default: boolean;
  updated_at: string;
  created_at: string;
  uf: string; // ENUM
};

type PersonType = {
  id: string;
  auth_user_id?: string;
  user_type: string; // ENUM
  privileges: number; // ENUM
  avatar_url: string;
  allow_email_newsletter: boolean;
  agreed_data_policies: boolean;
  person_data: PersonData;
  address: AddressData[];
};

type RefrigelUser = User & {
  refrigel_users: PersonType;
};
