export const formatCPF = (cpf: string) => cpf.replace(/\D/g, "");

export const formatPhone = (phone: string) => phone.replace(/\D/g, "");

export const formatBirth = (birth: string, separator = "-") => {
  // From DD/MM/YYYY to YYYY-MM-DD
  const date = birth.split("/");
  return `${date[2]}${separator}${date[1]}${separator}${date[0]}`;
};
